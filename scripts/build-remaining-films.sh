#!/usr/bin/env bash
set -euo pipefail

# Silent editorial motion studies assembled from each concept project's stills.
# Set FFMPEG_BIN when ffmpeg is not on PATH.
FFMPEG_BIN="${FFMPEG_BIN:-ffmpeg}"
LIB="public/OLYMPUS-asset-library/05-selected-work"
mkdir -p public/media

for project in northline helio aura; do
  "$FFMPEG_BIN" -loglevel error -y \
    -i "$LIB/$project-campaign.png" \
    -i "$LIB/$project-detail.png" \
    -i "$LIB/$project-materials.png" \
    -filter_complex "\
[0:v]scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900,zoompan=z='min(zoom+0.00050,1.06)':d=72:s=1280x720:fps=24,setsar=1[v0];\
[1:v]scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900,zoompan=z='min(zoom+0.00040,1.05)':d=72:s=1280x720:fps=24,setsar=1[v1];\
[2:v]scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900,zoompan=z='min(zoom+0.00055,1.06)':d=72:s=1280x720:fps=24,setsar=1[v2];\
[v0][v1][v2]concat=n=3:v=1:a=0,format=yuv420p[v]" \
    -map '[v]' -frames:v 216 -an -c:v libx264 -preset medium -crf 23 \
    -movflags +faststart "public/media/$project-motion-study.mp4"
  printf 'Wrote public/media/%s-motion-study.mp4\n' "$project"
done
