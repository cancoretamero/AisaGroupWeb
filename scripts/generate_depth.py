#!/usr/bin/env python3
import sys
from pathlib import Path

import numpy as np
import torch
from PIL import Image


def log(message: str) -> None:
  print(message, flush=True)


def ensure_depth_map(image_path: Path, output_path: Path) -> None:
  if not image_path.exists():
    raise FileNotFoundError(f"No se encontró la imagen base: {image_path}")

  device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
  log(f"Usando dispositivo: {device}")

  model_type = "DPT_Small"
  log("Cargando modelo MiDaS...")
  model = torch.hub.load("intel-isl/MiDaS", model_type)
  model.to(device)
  model.eval()

  transforms = torch.hub.load("intel-isl/MiDaS", "transforms")
  transform = transforms.small_transform

  image = Image.open(image_path).convert("RGB")
  input_batch = transform(image).to(device)

  with torch.no_grad():
    prediction = model(input_batch)
    prediction = torch.nn.functional.interpolate(
      prediction.unsqueeze(1) if prediction.ndim == 2 else prediction,
      size=image.size[::-1],
      mode="bicubic",
      align_corners=False
    ).squeeze()

  depth = prediction.cpu().numpy()
  depth_min, depth_max = depth.min(), depth.max()
  if depth_max - depth_min < 1e-6:
    normalized = np.zeros_like(depth, dtype=np.uint8)
  else:
    normalized = (depth - depth_min) / (depth_max - depth_min)
    normalized = (normalized * 255.0).clip(0, 255).astype(np.uint8)

  output_path.parent.mkdir(parents=True, exist_ok=True)
  Image.fromarray(normalized).save(output_path)
  log(f"Mapa de profundidad guardado en {output_path}")


if __name__ == "__main__":
  project_root = Path(__file__).resolve().parents[1]
  image_path = project_root / "public" / "hero" / "montanas.jpg"
  output_path = project_root / "public" / "hero" / "montanas-depth.png"

  try:
    ensure_depth_map(image_path, output_path)
  except Exception as error:  # pragma: no cover
    log(f"Error generando el mapa de profundidad: {error}")
    sys.exit(1)
