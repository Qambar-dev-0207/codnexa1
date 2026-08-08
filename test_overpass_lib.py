import overpass
import json

api = overpass.API(endpoint="https://overpass-api.de/api/interpreter", timeout=60)

# Query for shop, industrial, craft, office without website, having phone
q = """
(
  node["shop"="clothes"]["phone"][!"website"][!"contact:website"](51.4,-0.2,51.6,0.1);
  node["industrial"]["phone"][!"website"][!"contact:website"](51.4,-0.2,51.6,0.1);
  node["craft"]["phone"][!"website"][!"contact:website"](51.4,-0.2,51.6,0.1);
);
"""

try:
    res = api.get(q)
    features = res.get("features", [])
    print(f"Retrieved {len(features)} features")
    for f in features[:5]:
        props = f.get("properties", {})
        print("---")
        print("Name:", props.get("name"))
        print("Phone:", props.get("phone") or props.get("contact:phone"))
        print("Category:", props.get("shop") or props.get("industrial") or props.get("craft"))
except Exception as e:
    print("Error:", e)
