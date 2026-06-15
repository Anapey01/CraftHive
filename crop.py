import sys
from PIL import Image, ImageChops

def crop_white(image_path):
    try:
        img = Image.open(image_path).convert("RGB")
        bg = Image.new(img.mode, img.size, (255, 255, 255))
        diff = ImageChops.difference(img, bg)
        diff = ImageChops.add(diff, diff, 2.0, -30) # tolerance
        bbox = diff.getbbox()
        if bbox:
            padded_bbox = (max(0, bbox[0]-5), max(0, bbox[1]-5), min(img.width, bbox[2]+5), min(img.height, bbox[3]+5))
            cropped = img.crop(padded_bbox)
            
            # Now convert white to transparent for clean blending
            img_rgba = cropped.convert("RGBA")
            data = img_rgba.getdata()
            new_data = []
            for item in data:
                # If pixel is very close to white
                if item[0] > 245 and item[1] > 245 and item[2] > 245:
                    new_data.append((255, 255, 255, 0))
                else:
                    new_data.append(item)
            img_rgba.putdata(new_data)
            
            img_rgba.save(image_path, "PNG")
            print(f"Cropped {image_path}")
        else:
            print(f"No bounding box for {image_path}")
    except Exception as e:
        print(f"Error on {image_path}: {e}")

paths = ["public/process/step1.png", "public/process/step2.png", "public/process/step3.png"]
for p in paths:
    crop_white(p)
