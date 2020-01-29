# February

## v0.2
* Add envmap for lighting. Envmap does not necessarily need to be visible. (includes setting the scene.environment to the envmap, so that the objects actually receive the lighting from the map)<sup>1</sup>
    * Add some equirectangular HDRI envmaps
* Set tone mapping / output encoding. This can be changed if other forms of tone mapping look better.<sup>1</sup>
* Add a function to quickly add point lights. Disabled for now.
* Add light fading in/out animation. Disabled for now.
* Add basic sine curve that objects follow vertically. Want to replace with THREE.Path which the whole object follows
* Add fog (not sure how good this looks)
* Add some helpers

<sup>1</sup> Followed by example: https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_gltf.html#L21

## v0.1
* Basic hearts animation and coloring.
* Basic lighting - probably could use more lights to make it look more even.
* Fix animation stopping after tab loses focus.
* Panning with damping
 
# Ideas
* Add paths
* Add Cupid's arrows?
* Valentine's Day candy hearts?