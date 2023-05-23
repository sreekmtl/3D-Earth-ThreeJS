import { GeoJsonGeometry } from 'three-geojson-geometry';
import * as THREE from 'three';
import * as d3 from 'd3'

/*** 
 Script to load geojson file and convert to threejs lines
***/

export function loadgj() {
    return fetch('file/world.geojson')
      .then(res => res.json())
      .then(countries => {
        const alt = 6378;
        
        const lineObjs = [
          new THREE.LineSegments(
            new GeoJsonGeometry(d3.geoGraticule10(), alt),
            new THREE.LineBasicMaterial({
              color: 'white',
              opacity: 0.04,
              transparent: true,
            })
          )
        ];
        
        const materials = [
          new THREE.LineBasicMaterial({
            color: 'blue',
          }), // outer ring
          new THREE.LineBasicMaterial({
            color: 'green',
          }), // inner holes
        ];
        
        countries.features.forEach(({ properties, geometry }) => {
          lineObjs.push(new THREE.LineSegments(
            new GeoJsonGeometry(geometry, alt),
            materials
          ))
        });
        
        return lineObjs;
      });
  }
  