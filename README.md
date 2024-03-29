# February

## v0.4.3
* Fixed bug which would result in pound sign being inserted into query string.
* Omit mention of what is loaded in loading text.

## v0.4.2
* Implemented progress bar with loading messages.
* Added cancel option to custom text dialog.

## v0.4.1
* Multiline customizable text
* Base64 encoding in the query string as an option to preserve formatting such as line breaks. Base64 is automatically used with the custom text entry interface.
* Text is a bit larger (does not dynamically scale yet).
* Text has an emissive shader.

## v0.4
* Added basic customizable text.

## v0.3
* Changed perspective to head-on.
* Hearts do not rotate. They only move left-right and up. This can be tuned in the future.
* Added basic interface.
* Added custom fonts.
* Made fog less foggy.
* Added a candy heart model to repository. This is not being used yet.

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

# Todo
* Make text scale with window size
 
# Ideas
* Add paths
* Add Cupid's arrows?
* Valentine's Day candy hearts?