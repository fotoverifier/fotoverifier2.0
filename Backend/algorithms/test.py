import cv2
import numpy as np
import torch
import RRDBNet_arch as arch
import psutil

seed = 42
torch.manual_seed(seed)
np.random.seed(seed)

model_path = 'RRDB_PSNR_x4.pth'

model = arch.RRDBNet(3, 3, 64, 23, gc=32)
model.load_state_dict(torch.load(model_path, weights_only=True), strict=True)
model.eval()


img = cv2.imread('sample/baboon.png', cv2.IMREAD_COLOR)
print(img)
img = img * 1.0 / 255
img = torch.from_numpy(np.transpose(img[:, :, [2, 1, 0]], (2, 0, 1))).float()
img_LR = img.unsqueeze(0)

with torch.no_grad():
    output = model(img_LR).data.squeeze().float().cpu().clamp_(0, 1).numpy()
output = np.transpose(output[[2, 1, 0], :, :], (1, 2, 0))
print(output)
cv2.imshow('Output', output)
cv2.waitKey(0)
cv2.destroyAllWindows()
