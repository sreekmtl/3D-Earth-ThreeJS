# 3D-Earth-ThreeJS
3D virtual globe developed using ThreeJS. Digital Elevation Model (DEM) and overlay image (Landsat8) are loaded as WMS Layers from Geoserver and used to create the 3D terrain.

Prerequisites: You need nodeJS and Geoserver installation on your system. If you want to load image locally instead of from Geoserver, you have to make changes in landcanvas.js file in calculating the extent of overlaymesh.

To Run
> git clone repo,
> open terminal,
> npx vite --config vite.config.js


**Preview Images**

1. Home Page
![alt text](https://github.com/sreekmtl/3D-Earth-ThreeJS/blob/main/preview/3d9.png)
2. DEM layer
![alt text](https://github.com/sreekmtl/3D-Earth-ThreeJS/blob/main/preview/3d8.png)
3. DEM Layer and Overlay landsat image
![alt text](https://github.com/sreekmtl/3D-Earth-ThreeJS/blob/main/preview/3d5.png)
