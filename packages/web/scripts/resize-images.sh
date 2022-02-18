#!/bin/sh

cd public/nfts/1000x1000

for i in *.png; do
  convert $i -resize 1000x1000 $i
done

image_optim *.png
