import sys
from PIL import Image

def safe_crop(src, dest):
    try:
        img = Image.open(src).convert("RGBA")
        data = img.getdata()
        min_x = img.width
        min_y = img.height
        max_x = 0
        max_y = 0
        
        for y in range(img.height):
            for x in range(img.width):
                r, g, b, a = data[y * img.width + x]
                # Anything not practically pure white is subject
                if r < 245 or g < 245 or b < 245:
                    if x < min_x: min_x = x
                    if y < min_y: min_y = y
                    if x > max_x: max_x = x
                    if y > max_y: max_y = y
                    
        if max_x >= min_x and max_y >= min_y:
            # add a 5px safe border
            box = (
                max(0, min_x - 5),
                max(0, min_y - 5),
                min(img.width, max_x + 5),
                min(img.height, max_y + 5)
            )
            cropped = img.crop(box)
            cropped.save(dest, "PNG")
            print(f"Safely cropped {dest} to {box}")
        else:
            print(f"No subject found in {src}")
    except Exception as e:
        print(f"Error processing {src}: {e}")

safe_crop(r"C:\Users\user\.gemini\antigravity\brain\b984c0ec-4ff1-45ae-b63b-8fbe23b28424\step1_phone_1781544467288.png", "public/process/step1.png")
safe_crop(r"C:\Users\user\.gemini\antigravity\brain\b984c0ec-4ff1-45ae-b63b-8fbe23b28424\step2_frames_1781544498505.png", "public/process/step2.png")
safe_crop(r"C:\Users\user\.gemini\antigravity\brain\b984c0ec-4ff1-45ae-b63b-8fbe23b28424\step3_framed_1781544552578.png", "public/process/step3.png")
