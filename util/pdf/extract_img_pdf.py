import argparse
import fitz  # PyMuPDF
from PIL import Image
from collections import defaultdict
import os
import io


def extract_images_from_pdf(pdf_path, page_range=None):
    doc = fitz.open(pdf_path)
    images = []
    for page_num in page_range if page_range else range(len(doc)):
        page = doc.load_page(page_num)
        for img_index, img in enumerate(page.get_images(full=True)):
            # print(img)
            xref = img[0]
            width = img[2]
            name = img[7]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            image = Image.open(io.BytesIO(image_bytes))
            images.append((image, width, page_num, name))
    return images


def combine_images_vertically(images, output_path):
    total_height = sum(image.height for (image,_) in images)
    max_width = max(image.width for (image,_) in images)
    combined_image = Image.new("RGB", (max_width, total_height))
    y_offset = 0
    
    sorted_images = sorted(images, key=lambda x: x[1])
    
    for image, _ in sorted_images:
        combined_image.paste(image, (0, y_offset))
        y_offset += image.height
    combined_image.save(output_path)


def main(pdf_path, output_dir, page_range=None):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    images = extract_images_from_pdf(pdf_path, page_range)
    images_by_width_and_page = defaultdict(lambda: defaultdict(list))

    for image, width, page_num, name in images:
        images_by_width_and_page[page_num][width].append((image, name))

    idx = 1
    for page_num, widths in images_by_width_and_page.items():
        idx = 1
        for width, images in widths.items():
            page_dir = os.path.join(output_dir, f"page_{page_num + 1}")
            if not os.path.exists(page_dir):
                os.makedirs(page_dir)
            output_path = os.path.join(page_dir, f"{idx}.jpg")
            combine_images_vertically(images, output_path)
            print(
                f"Saved combined image for width {width} on page {page_num + 1} to {output_path}"
            )
            idx = idx + 1


if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        description="Extract and combine images from a PDF."
    )
    parser.add_argument("pdf_path", type=str, help="Path to the input PDF file.")
    parser.add_argument(
        "output_dir", type=str, nargs='?', default='output_images', help="Directory to save combined images."
    )
    
    parser.add_argument('--page_range', nargs='+', type=int, default=None)
    
    args = parser.parse_args()

    main(
        args.pdf_path,
        args.output_dir,
        tuple(args.page_range) if args.page_range else None,
    )