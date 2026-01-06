#!/usr/bin/env python3
"""
LOOP AI Vision Service
Photo-to-Product Identification Engine

Uses Google Gemini 1.5 Flash for high-speed image analysis
Returns structured JSON with Brand, Model, Condition, and Price Estimate
"""

import os
import json
import base64
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from enum import Enum
import requests
from PIL import Image
import io

# Third-party imports (install with: pip install google-generativeai requests pillow)
import google.generativeai as genai

# ============================================================================
# DATA MODELS
# ============================================================================

class ItemCondition(Enum):
    NEW_WITH_TAGS = "new_with_tags"
    NEW_WITHOUT_TAGS = "new_without_tags"
    EXCELLENT = "excellent"
    GOOD = "good"
    FAIR = "fair"
    POOR = "poor"

class ProductCategory(Enum):
    CLOTHING = "clothing"
    SHOES = "shoes"
    ELECTRONICS = "electronics"
    BOOKS = "books"
    HOME_GOODS = "home_goods"
    SPORTS = "sports"
    JEWELRY = "jewelry"
    TOYS = "toys"
    AUTOMOTIVE = "automotive"
    OTHER = "other"

@dataclass
class PriceEstimate:
    low: float
    mid: float
    high: float
    currency: str = "USD"
    confidence: float = 0.0
    source: str = "ai_estimate"

@dataclass
class AIAnalysis:
    category: ProductCategory
    brand: Optional[str]
    model: Optional[str]
    condition: ItemCondition
    confidence: float  # 0-1

    # AI-generated content
    seo_title: Optional[str]
    description: Optional[str]
    tags: List[str]

    # Pricing
    estimated_value: PriceEstimate

    # Raw AI response for debugging
    raw_response: Optional[Dict[str, Any]] = None

# ============================================================================
# AI VISION SERVICE
# ============================================================================

class LoopAIVisionService:
    def __init__(self, api_key: str):
        """
        Initialize with Google Gemini API key
        """
        self.api_key = api_key
        genai.configure(api_key=api_key)

        # Initialize Gemini model
        self.model = genai.GenerativeModel('gemini-1.5-flash')

        # Generation config for structured output
        self.generation_config = genai.types.GenerationConfig(
            temperature=0.1,  # Low temperature for consistent results
            top_p=0.8,
            top_k=40,
            max_output_tokens=2048,
        )

    def analyze_product_from_image(self, image_path: str) -> AIAnalysis:
        """
        Main method: Analyze a product photo and return structured data

        Args:
            image_path: Path to image file or base64 string

        Returns:
            AIAnalysis object with all product information
        """
        try:
            # Load and prepare image
            image_data = self._load_image(image_path)

            # Generate analysis using AI
            analysis = self._generate_analysis(image_data)

            return analysis

        except Exception as e:
            raise AIVisionError(f"Failed to analyze image: {str(e)}")

    def analyze_product_from_base64(self, base64_string: str) -> AIAnalysis:
        """
        Analyze product from base64 encoded image
        """
        try:
            # Decode base64 to image
            image_data = base64.b64decode(base64_string)
            image = Image.open(io.BytesIO(image_data))

            # Convert to format Gemini expects
            image_data = self._prepare_image_for_gemini(image)

            # Generate analysis
            analysis = self._generate_analysis(image_data)

            return analysis

        except Exception as e:
            raise AIVisionError(f"Failed to analyze base64 image: {str(e)}")

    def _load_image(self, image_path: str):
        """
        Load image from file path or handle base64
        """
        if image_path.startswith('data:image'):
            # Handle data URL
            header, base64_data = image_path.split(',', 1)
            return self.analyze_product_from_base64(base64_data)

        elif os.path.exists(image_path):
            # Load from file
            image = Image.open(image_path)
            return self._prepare_image_for_gemini(image)

        else:
            raise ValueError(f"Invalid image path: {image_path}")

    def _prepare_image_for_gemini(self, image: Image.Image):
        """
        Convert PIL image to Gemini-compatible format
        """
        # Gemini works with PIL images directly
        return image

    def _generate_analysis(self, image_data) -> AIAnalysis:
        """
        Use Gemini to analyze the product image
        """
        prompt = self._build_analysis_prompt()

        try:
            response = self.model.generate_content(
                [prompt, image_data],
                generation_config=self.generation_config
            )

            # Parse the response
            result = self._parse_ai_response(response.text)

            # Add raw response for debugging
            result.raw_response = {
                'prompt': prompt,
                'response': response.text,
                'model': 'gemini-1.5-flash'
            }

            return result

        except Exception as e:
            raise AIVisionError(f"AI analysis failed: {str(e)}")

    def _build_analysis_prompt(self) -> str:
        """
        Build the detailed prompt for product analysis
        """
        return """You are an expert product identification AI for LOOP, an instant liquidation app.

Analyze this product image and return a JSON object with the following fields:

{
  "category": "one of: clothing, shoes, electronics, books, home_goods, sports, jewelry, toys, automotive, other",
  "brand": "brand name if identifiable, null otherwise",
  "model": "specific model name/version if identifiable, null otherwise",
  "condition": "one of: new_with_tags, new_without_tags, excellent, good, fair, poor",
  "confidence": 0.0-1.0 (how confident you are in your identification),
  "seo_title": "SEO-optimized title for marketplace listing (50-80 chars)",
  "description": "Detailed product description for selling (200-500 chars)",
  "tags": ["array", "of", "relevant", "tags"],
  "estimated_value": {
    "low": number (realistic low end resale value),
    "mid": number (most likely resale value),
    "high": number (optimistic high end),
    "currency": "USD",
    "confidence": 0.0-1.0
  }
}

Guidelines:
- Be realistic about condition - most items are "good" or "fair", not "excellent"
- Research current market values for similar items
- Focus on resalable items (no trash, damaged goods unless valuable)
- If unsure about brand/model, set to null rather than guess
- Confidence should reflect how clear the image is and how distinctive the item is
- SEO title should include brand, model, condition, key features
- Description should highlight positives and be honest about flaws

Return ONLY valid JSON, no markdown or explanation."""

    def _parse_ai_response(self, response_text: str) -> AIAnalysis:
        """
        Parse the AI response into our data structure
        """
        try:
            # Clean up response (remove markdown if present)
            cleaned_text = response_text.strip()
            if cleaned_text.startswith('```json'):
                cleaned_text = cleaned_text[7:]
            if cleaned_text.endswith('```'):
                cleaned_text = cleaned_text[:-3]
            cleaned_text = cleaned_text.strip()

            # Parse JSON
            data = json.loads(cleaned_text)

            # Validate required fields
            required_fields = ['category', 'condition', 'confidence', 'estimated_value']
            for field in required_fields:
                if field not in data:
                    raise ValueError(f"Missing required field: {field}")

            # Convert to our data types
            return AIAnalysis(
                category=ProductCategory(data['category']),
                brand=data.get('brand'),
                model=data.get('model'),
                condition=ItemCondition(data['condition']),
                confidence=float(data['confidence']),
                seo_title=data.get('seo_title'),
                description=data.get('description'),
                tags=data.get('tags', []),
                estimated_value=PriceEstimate(
                    low=float(data['estimated_value']['low']),
                    mid=float(data['estimated_value']['mid']),
                    high=float(data['estimated_value']['high']),
                    currency=data['estimated_value'].get('currency', 'USD'),
                    confidence=float(data['estimated_value'].get('confidence', 0.5))
                )
            )

        except (json.JSONDecodeError, KeyError, ValueError) as e:
            raise AIVisionError(f"Failed to parse AI response: {str(e)}. Response: {response_text}")

# ============================================================================
# MARKET DATA INTEGRATION
# ============================================================================

class MarketDataService:
    """
    Optional: Cross-reference AI estimates with real market data
    """

    def __init__(self):
        # Could integrate with eBay API, Mercari, etc.
        pass

    def get_market_prices(self, brand: str, model: str, condition: str) -> Optional[PriceEstimate]:
        """
        Get real market data to validate AI estimates
        """
        # Implementation would call marketplace APIs
        # For now, return None (AI-only pricing)
        return None

# ============================================================================
# ERROR HANDLING
# ============================================================================

class AIVisionError(Exception):
    """Custom exception for AI vision service errors"""
    pass

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def validate_image_file(image_path: str) -> bool:
    """
    Validate that image file exists and is a supported format
    """
    if not os.path.exists(image_path):
        return False

    supported_formats = {'.jpg', '.jpeg', '.png', '.webp', '.bmp'}
    _, ext = os.path.splitext(image_path.lower())

    return ext in supported_formats

# ============================================================================
# MAIN CLI INTERFACE
# ============================================================================

def main():
    """
    CLI interface for testing the AI vision service
    """
    import argparse

    parser = argparse.ArgumentParser(description='LOOP AI Vision Service')
    parser.add_argument('image_path', help='Path to product image')
    parser.add_argument('--api-key', help='Google Gemini API key', required=True)
    parser.add_argument('--output', '-o', help='Output JSON file')

    args = parser.parse_args()

    # Validate inputs
    if not validate_image_file(args.image_path):
        print(f"Error: Invalid image file: {args.image_path}")
        return 1

    try:
        # Initialize service
        service = LoopAIVisionService(args.api_key)

        # Analyze image
        print(f"Analyzing {args.image_path}...")
        result = service.analyze_product_from_image(args.image_path)

        # Convert to dict for JSON output
        output_data = asdict(result)
        # Remove raw_response for clean output
        output_data.pop('raw_response', None)

        # Pretty print to console
        print("\n" + "="*50)
        print("LOOP AI ANALYSIS RESULTS")
        print("="*50)
        print(f"Category: {result.category.value}")
        print(f"Brand: {result.brand or 'Unknown'}")
        print(f"Model: {result.model or 'Unknown'}")
        print(f"Condition: {result.condition.value}")
        print(f"Confidence: {result.confidence:.2%}")
        print(f"Estimated Value: ${result.estimated_value.mid:.2f} USD")
        print(f"Price Range: ${result.estimated_value.low:.2f} - ${result.estimated_value.high:.2f}")
        print(f"SEO Title: {result.seo_title}")
        print(f"Tags: {', '.join(result.tags)}")
        print("\nDescription:")
        print(result.description)

        # Save to file if requested
        if args.output:
            with open(args.output, 'w') as f:
                json.dump(output_data, f, indent=2)
            print(f"\nResults saved to: {args.output}")

        return 0

    except AIVisionError as e:
        print(f"AI Vision Error: {e}")
        return 1
    except Exception as e:
        print(f"Unexpected error: {e}")
        return 1

if __name__ == '__main__':
    exit(main())