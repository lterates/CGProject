let renderer, scene, camera;
renderer = document.getElementById("canvas-container");

// once everything is loaded, we run our Three.js stuff
window.onload = function init() {
    /*********************
     * SCENE 
     * *******************/
    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene();

    //funcao q faz as arvores
    spawnArvores();
    createFloor(); 

    /*let axes = new THREE.AxesHelper(500);
    scene.add(axes)*/

    /*********************
     * CAMERA 
     * *******************/
    ///camera position
    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 4;
    camera.position.z = 45;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

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
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });  

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

function createFloor() {

    let grassGeometry = new THREE.BoxGeometry(80, 80, 2);
    let grassTex = new THREE.TextureLoader().load("./img/Leaves1.jpg")
    grassTex.wrapS = THREE.RepeatWrapping;
    grassTex.wrapT = THREE.RepeatWrapping;
    grassTex.repeat.set(27, 27)

    let grassMaterial = new THREE.MeshPhongMaterial({
        map: grassTex,
        side: THREE.DoubleSide,
    })

    let grass = new THREE.Mesh(grassGeometry, grassMaterial);

    grass.rotation.x = Math.PI / 2; //roda 90 graus em x
    grass.position.y = -0.9
    scene.add(grass)

}


// construtor das arvores
function spawnArvores() {
    // Tronco
    let troncoGeo = new THREE.CylinderGeometry(0.5, 0.5, 8)
    let troncoTex = new THREE.TextureLoader().load("./img/tree tex.png")
    let troncoMaterial = new THREE.MeshPhongMaterial({
        map: troncoTex
    })

    // Folhas
    let copaGeo = new THREE.SphereGeometry(4, 4, 20)
    let copaTex = new THREE.TextureLoader().load("./img/leaves.jpg")
    let copaMaterial = new THREE.MeshPhongMaterial({
        map: copaTex
    })

    arvore = new THREE.Object3D()
    //Tronco
    let tronco = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco.position.y = 3
    arvore.add(tronco)
    //Folhas
    let copa = new THREE.Mesh(copaGeo, copaMaterial)
    copa.position.y = 3
    tronco.add(copa)
    arvore.position.set(9, 1, 15)
    scene.add(arvore)

    arvore1 = new THREE.Object3D()
    //Tronco
    let tronco1 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco1.position.y = 3
    arvore1.add(tronco1)
    //Folhas
    let copa1 = new THREE.Mesh(copaGeo, copaMaterial)
    copa1.position.y = 3
    tronco1.add(copa1)
    arvore1.position.set(20, 1, 15)
    scene.add(arvore1)

    arvore2 = new THREE.Object3D()
    //Tronco
    let tronco2 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco2.position.y = 3
    arvore2.add(tronco2)
    //Folhas
    let copa2 = new THREE.Mesh(copaGeo, copaMaterial)
    copa2.position.y = 3
    tronco2.add(copa2)
    arvore2.position.set(-20, 1, -15)
    scene.add(arvore2)

    arvore3 = new THREE.Object3D()
    //Tronco
    let tronco3 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco3.position.y = 3
    arvore3.add(tronco3)
    //Folhas
    let copa3 = new THREE.Mesh(copaGeo, copaMaterial)
    copa3.position.y = 3
    tronco3.add(copa3)
    arvore3.position.set(-16, 1, 25)
    scene.add(arvore3)

    arvore4 = new THREE.Object3D()
    //Tronco
    let tronco4 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco4.position.y = 3
    arvore4.add(tronco4)
    //Folhas
    let copa4 = new THREE.Mesh(copaGeo, copaMaterial)
    copa4.position.y = 3
    tronco4.add(copa4)
    arvore4.position.set(-10, 1, 0)
    scene.add(arvore4)

    arvore5 = new THREE.Object3D()
    //Tronco
    let tronco5 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco5.position.y = 3
    arvore5.add(tronco5)
    //Folhas
    let copa5 = new THREE.Mesh(copaGeo, copaMaterial)
    copa5.position.y = 3
    tronco5.add(copa5)
    arvore5.position.set(32, 1, -10)
    scene.add(arvore5)

    arvore6 = new THREE.Object3D()
    //Tronco
    let tronco6 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco6.position.y = 3
    arvore6.add(tronco6)
    //Folhas
    let copa6 = new THREE.Mesh(copaGeo, copaMaterial)
    copa6.position.y = 3
    tronco6.add(copa6)
    arvore6.position.set(17, 1, 5)
    scene.add(arvore6)

    arvore7 = new THREE.Object3D()
    //Tronco
    let tronco7 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco7.position.y = 3
    arvore7.add(tronco7)
    //Folhas
    let copa7 = new THREE.Mesh(copaGeo, copaMaterial)
    copa7.position.y = 3
    tronco7.add(copa7)
    arvore7.position.set(27, 1, 34)
    scene.add(arvore7)

    arvore8 = new THREE.Object3D()
    //Tronco
    let tronco8 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco8.position.y = 3
    arvore8.add(tronco8)
    //Folhas
    let copa8 = new THREE.Mesh(copaGeo, copaMaterial)
    copa8.position.y = 3
    tronco8.add(copa8)
    arvore8.position.set(-34, 1, -30)
    scene.add(arvore8)

    arvore9 = new THREE.Object3D()
    //Tronco
    let tronco9 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco9.position.y = 3
    arvore9.add(tronco9)
    //Folhas
    let copa9 = new THREE.Mesh(copaGeo, copaMaterial)
    copa9.position.y = 3
    tronco9.add(copa9)
    arvore9.position.set(11, 1, -25)
    scene.add(arvore9)

    arvore10 = new THREE.Object3D()
    //Tronco
    let tronco10 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco10.position.y = 3
    arvore10.add(tronco10)
    //Folhas
    let copa10 = new THREE.Mesh(copaGeo, copaMaterial)
    copa10.position.y = 3
    tronco10.add(copa10)
    arvore10.position.set(25, 1, -18)
    scene.add(arvore10)

    arvore11 = new THREE.Object3D()
    //Tronco
    let tronco11 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco11.position.y = 3
    arvore11.add(tronco11)
    //Folhas
    let copa11 = new THREE.Mesh(copaGeo, copaMaterial)
    copa11.position.y = 3
    tronco11.add(copa11)
    arvore11.position.set(-25, 1, 15)
    scene.add(arvore11)

}

function handleKeyDown(e) {
    let char = e.key;

    console.log(char)

    /*****************************
     * RENDER 
     * ***************************/
    renderer.render(scene, camera);
}
