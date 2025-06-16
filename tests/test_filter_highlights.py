import pytest
import sys
import types
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

sys.modules.setdefault("requests", types.ModuleType("requests"))
sys.modules.setdefault("yaml", types.ModuleType("yaml"))

from fetch_highlights import filter_highlights


def test_returns_favorite_highlight():
    highlights = [{"is_favorite": True, "tags": []}]
    assert filter_highlights(highlights) == highlights


def test_returns_share_tag_highlight():
    highlights = [{"is_favorite": False, "tags": [{"name": "share"}]}]
    assert filter_highlights(highlights) == highlights


def test_filters_non_matching_highlight():
    highlights = [{"is_favorite": False, "tags": [{"name": "other"}]}]
    assert filter_highlights(highlights) == []


def test_mixed_highlights():
    hs = [
        {"is_favorite": False, "tags": [{"name": "share"}]},
        {"is_favorite": True, "tags": []},
        {"is_favorite": False, "tags": []},
    ]
    assert filter_highlights(hs) == hs[:2]
