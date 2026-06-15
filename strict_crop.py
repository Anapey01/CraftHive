import sys
from PIL import Image

def strict_crop(img_path):
    try:
        img = Image.open(img_path).convert("RGBA")
        data = img.getdata()
        min_x = img.width
        min_y = img.height
        max_x = 0
        max_y = 0
        
        for y in range(img.height):
            for x in range(img.width):
                r, g, b, a = data[y * img.width + x]
                # If pixel is dark enough, it's part of the subject
                if a > 0 and (r < 210 or g < 210 or b < 210):
                    if x < min_x: min_x = x
                    if y < min_y: min_y = y
                    if x > max_x: max_x = x
                    if y > max_y: max_y = y
                    
        if max_x >= min_x and max_y >= min_y:
            # Add a small 2px padding so we don't clip too tight
            box = (
                max(0, min_x - 2),
                max(0, min_y - 2),
                min(img.width, max_x + 2),
                min(img.height, max_y + 2)
            )
            cropped = img.crop(box)
            
            # Now make the remaining white/grey completely white and then multiply in css
            # or just leave transparent
            img_rgba = cropped.convert("RGBA")
            new_data = []
            for item in img_rgba.getdata():
                if item[0] > 220 and item[1] > 220 and item[2] > 220:
                    new_data.append((255, 255, 255, 0)) # transparent
                else:
                    new_data.append(item)
            img_rgba.putdata(new_data)
            
            img_rgba.save(img_path, "PNG")
            print(f"Cropped {img_path} to {box}")
        else:
            print(f"No subject found in {img_path}")
    except Exception as e:
        print(f"Error processing {img_path}: {e}")

paths = ["public/process/step1.png", "public/process/step2.png", "public/process/step3.png"]
for p in paths:
    strict_crop(p)
