import * as THREE from 'three';
import * as GeoTIFF from 'geotiff'
import { TIFFLoader } from 'three/addons/loaders/TIFFLoader.js';


/*** 
 Script to load satellite images as WMS layers and to overlay the globe. This script will load both the dem image for terrain and overlaying
 rgb tif image
***/
export function overlay(){

var tifimg;

//loading tif file
const readGeoTif= async () => {
    const rawTiff= await GeoTIFF.fromUrl('textures/dem.tif');
    const tifImage= await rawTiff.getImage();
    const image = {
        width: tifImage.getWidth(),
        height: tifImage.getHeight(),
      };
    tifimg= tifImage;
}

let demName = 'three:dem';
let l8layerName= 'three:idkl8';
let bbox=[76.24868774414062,8.75006103515625, 77.76315307617188,10.86053466796875];

//function to make wms layer request
function wmsreq(wmsLayerName,bbox){
    var wmsUrl = '/api/three/wms';
    var wmsLayerName = wmsLayerName;
    var wmsFormat = 'image/png';
    var srs='EPSG:4326';
    var bbox=bbox; //as of now creating bbox manually

    var imgurl = wmsUrl + '?service=WMS' +
        '&version=1.1.0' +
        '&request=GetMap' +
        '&layers=' + wmsLayerName +
        '&srs=' + srs +
        '&format=' + wmsFormat +
        '&transparent=true' +
        '&width=2800' +  // Set the desired image width
        '&height=4000' + // Set the desired image height
        '&bbox=' + bbox.join(',');

    return imgurl

}

var ps=180+parseFloat(bbox[0]) //phistart
var ts=90-parseFloat(bbox[3]) //thetastart

function checkNeg(n){
    if(n<0){
        n=0-n;
    }
    return n;
}

for(let i=0;i<bbox.length;i++){
    bbox[i]=checkNeg(bbox[i]);
}

var pl= bbox[0]-bbox[2]; //philength
var tl= bbox[1]-bbox[3]; //thetalength

pl=checkNeg(pl);
tl=checkNeg(tl);

//converting pl and tl to radians
ps= ps*(Math.PI/180);
ts= ts*(Math.PI/180);
pl= pl*(Math.PI/180);
tl= tl*(Math.PI/180);


//creating geometry
const geometry= new THREE.SphereGeometry(6378,64,64,ps,pl,ts,tl);

const textureimg= new THREE.TextureLoader().load(wmsreq(l8layerName,bbox)); //loading overlay image as wms layer
const distext= new THREE.TextureLoader().load(wmsreq(demName,bbox));  //loading dem as wms layer


//adding the textures to material
var material= new THREE.MeshPhongMaterial({ map:textureimg,transparent:true,displacementMap:distext,displacementScale:10});

//creating mesh (from material and geometry)
var overlaymesh= new THREE.Mesh(geometry, material);


return overlaymesh;

}
