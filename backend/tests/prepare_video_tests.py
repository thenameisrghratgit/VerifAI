import json
import os
import shutil


SOURCE_DIR = r"C:\Sample Deepfake videos"
OUTPUT_DIR = r"C:\backend\uploads"

METADATA_PATH = os.path.join(
    SOURCE_DIR,
    "metadata.json"
)


os.makedirs(
    OUTPUT_DIR,
    exist_ok=True
)


# ---------------------------------------------
# Load metadata
# ---------------------------------------------

if not os.path.exists(METADATA_PATH):

    raise FileNotFoundError(
        f"metadata.json not found:\n{METADATA_PATH}"
    )


with open(
    METADATA_PATH,
    "r",
    encoding="utf-8"
) as file:

    metadata = json.load(file)


real_videos = []
fake_videos = []


# ---------------------------------------------
# Find REAL / FAKE videos
# ---------------------------------------------

for filename, info in metadata.items():

    label = info.get(
        "label",
        ""
    ).upper()

    video_path = os.path.join(
        SOURCE_DIR,
        filename
    )

    if not os.path.exists(video_path):
        continue

    if label == "REAL":

        real_videos.append(
            video_path
        )

    elif label == "FAKE":

        fake_videos.append(
            video_path
        )


print(
    f"REAL videos found: {len(real_videos)}"
)

print(
    f"FAKE videos found: {len(fake_videos)}"
)


# ---------------------------------------------
# Make sure enough videos exist
# ---------------------------------------------

if len(real_videos) < 2:

    raise RuntimeError(
        "Need at least 2 REAL videos."
    )

if len(fake_videos) < 4:

    raise RuntimeError(
        "Need at least 4 FAKE videos."
    )


# ---------------------------------------------
# Select test videos
# ---------------------------------------------

selected = [

    (
        real_videos[0],
        "real_01.mp4"
    ),

    (
        real_videos[1],
        "real_02.mp4"
    ),

    (
        fake_videos[0],
        "fake_01.mp4"
    ),

    (
        fake_videos[1],
        "fake_02.mp4"
    ),

    (
        fake_videos[2],
        "fake_03.mp4"
    ),

    (
        fake_videos[3],
        "fake_04.mp4"
    )
]


# ---------------------------------------------
# Copy files
# ---------------------------------------------

print("\nCopying test videos...\n")


for source, destination in selected:

    destination_path = os.path.join(
        OUTPUT_DIR,
        destination
    )

    shutil.copy2(
        source,
        destination_path
    )

    print(
        f"{destination} "
        f"<- {os.path.basename(source)}"
    )


print(
    "\n========================================"
)

print(
    "TEST VIDEOS READY"
)

print(
    "========================================"
)

print(
    f"Location: {OUTPUT_DIR}"
)

print(
    "\nREAL:"
)

print(
    "  real_01.mp4"
)

print(
    "  real_02.mp4"
)

print(
    "\nFAKE:"
)

print(
    "  fake_01.mp4"
)

print(
    "  fake_02.mp4"
)

print(
    "  fake_03.mp4"
)

print(
    "  fake_04.mp4"
)