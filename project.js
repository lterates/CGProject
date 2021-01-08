let renderer, scene, camera;
renderer = document.getElementById("canvas-container");

// once everything is loaded, we run our Three.js stuff
window.onload = function init() {
    /*********************
     * SCENE 
     * *******************/
    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene();

    let axes = new THREE.AxesHelper(500);
    scene.add(axes)

    /*********************
     * CAMERA 
     * *******************/
    // create a camera and a perspective projection
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 4000);
    //set the camera's view transformation
    camera.position.set(-200, 350, 650);

    /*********************
     * RENDERER 
     * *******************/
    // create a render and set the size
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x66ccff, 1.0);

    // add the output of the renderer to an HTML element (this case, the body)
    document.body.appendChild(renderer.domElement);

    /*********************
    * CONTROLS 
    * *******************/
    let controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () { renderer.render(scene, camera); });

    // Create a plane that receives shadows (but does not cast them)
    let planeGeometry = new THREE.PlaneBufferGeometry(10000, 10000, 32, 32);
    let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xb69a77, side: THREE.DoubleSide });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.name = "plane"
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = -1;
    scene.add(plane);


    /*****************************
    * LIGHTS 
    ****************************/
    //ambient light
    ambientLight = new THREE.AmbientLight(0x404040, 2);
    ambientLight.visible = true;
    scene.add(ambientLight);


    // Add key handling
    document.onkeydown = handleKeyDown;

    /*****************************
     * RENDER 
     * ***************************/
    renderer.render(scene, camera);
}

function handleKeyDown(e) {
    let char = e.key;

    console.log(char)
    
    /*****************************
     * RENDER 
     * ***************************/
    renderer.render(scene, camera);
}