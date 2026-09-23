#!/usr/bin/env bash
set -euo pipefail

# Silent editorial motion study assembled from VELA's still campaign frames.
# Set FFMPEG_BIN when ffmpeg is not on PATH.
FFMPEG_BIN="${FFMPEG_BIN:-ffmpeg}"
LIB="public/OLYMPUS-asset-library/05-selected-work"
OUT="public/media/vela-motion-study.mp4"
mkdir -p public/media

"$FFMPEG_BIN" -y \
  -i "$LIB/vela-silhouette.png" \
  -i "$LIB/vela-fabric-detail.png" \
  -i "$LIB/vela-material-study.png" \
  -filter_complex "\
[0:v]scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900,zoompan=z='min(zoom+0.00055,1.06)':d=72:s=1280x720:fps=24,setsar=1[v0];\
[1:v]scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900,zoompan=z='min(zoom+0.00045,1.05)':d=72:s=1280x720:fps=24,setsar=1[v1];\
[2:v]scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900,zoompan=z='min(zoom+0.00050,1.06)':d=72:s=1280x720:fps=24,setsar=1[v2];\
[v0][v1][v2]concat=n=3:v=1:a=0,format=yuv420p[v]" \
  -map '[v]' -frames:v 216 -an -c:v libx264 -preset medium -crf 23 \
  -movflags +faststart "$OUT"
