let renderer, scene, camera;
let pathSpeed = 0
let sphere;
renderer = document.getElementById("canvas-container");
let balls = [];
let rain, rainGeometry, rainCount = 10000;

// once everything is loaded, we run our Three.js stuff
window.onload = function init() {

    /*********************
     * SCENE 
     * *******************/
    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene();

    //funcao q faz as arvores
    spawnArvores();
    spawnCharacter();
    createFloor();
    ball();

    /*********************
     * CAMERA 
     * *******************/
    ///camera position
    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 500);
    camera.position.x = 0;
    camera.position.y = 20;
    camera.position.z = 45;
    
    scene.add(camera);
    scene.background = 0xFFFFFF;
    scene.fog = new THREE.Fog( 0xFFFFFF, 50, 100)
    
    /*********************
     * RENDERER 
     * *******************/
    // create a render and set the size
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x66ccff, 1.0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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

    directionalLight = new THREE.DirectionalLight(0x404040, 1);
    directionalLight.position.set(4, 20, 15)
    scene.add(directionalLight)
    directionalLight.castShadow = true;

    const light = new THREE.HemisphereLight( 0xffffff, 0x080820, 0.7);
    scene.add( light );

    //scene.add(new THREE.AxesHelper(50))

    // Add key handling
    document.onkeydown = handleKeyDown;

    /*****************************
     * RENDER 
     * ***************************/
    renderer.render(scene, camera);
    camera.lookAt(new THREE.Vector3(-2, 5, -6));
    //weather();
    animate();
}

// CHÃO
function createFloor() {

    //neve
    let snowGeometry = new THREE.BoxGeometry(300, 300, 1.2);
    let snowTex = new THREE.TextureLoader().load("./img/snowFloor.jpg")
    snowTex.wrapS = THREE.RepeatWrapping;
    snowTex.wrapT = THREE.RepeatWrapping;
    snowTex.repeat.set(5, 5)
    let snowMaterial = new THREE.MeshPhongMaterial({
        map: snowTex,
        side: THREE.DoubleSide,
    })
    let snow = new THREE.Mesh(snowGeometry, snowMaterial)
    snow.rotation.x = Math.PI / 2; //roda 90 graus em x
    snow.position.y = -0.9
    scene.add(snow)
    snow.receiveShadow = true;

    //rio 1
    let path2Geometry = new THREE.BoxGeometry(10, 200, 1.01)
    let path2Tex = new THREE.TextureLoader().load("./img/water.png")
    //repetir a textura do path 
    path2Tex.wrapS = THREE.RepeatWrapping;
    path2Tex.wrapT = THREE.RepeatWrapping;
    path2Tex.repeat.set(7, 7)
    let path2Material = new THREE.MeshPhongMaterial({
        map: path2Tex,
        side: THREE.DoubleSide,
    })

    let path2 = new THREE.Mesh(path2Geometry, path2Material)
    path2.rotation.x = Math.PI / 2
    path2.rotation.z = 90
    path2.position.set(-10, -0.8, 8)
    scene.add(path2)

    //rio 2
    let path1Geometry = new THREE.BoxGeometry(10, 200, 1.01)
    let path1Tex = new THREE.TextureLoader().load("./img/water.png")
    //repetir a textura do path 
    path1Tex.wrapS = THREE.RepeatWrapping;
    path1Tex.wrapT = THREE.RepeatWrapping;
    path1Tex.repeat.set(7, 7)
    let path1Material = new THREE.MeshPhongMaterial({
        map: path1Tex,
        side: THREE.DoubleSide,
    })

    let path1 = new THREE.Mesh(path1Geometry, path1Material)
    path1.rotation.x = Math.PI / 2
    path1.rotation.z = -90
    path1.position.set(-10, -0.8, -20)
    scene.add(path1)

    //rio 5
    let path4Geometry = new THREE.BoxGeometry(10, 50, 1.001)
    let path4Tex = new THREE.TextureLoader().load("./img/water.png")
    //repetir a textura do path 
    path4Tex.wrapS = THREE.RepeatWrapping;
    path4Tex.wrapT = THREE.RepeatWrapping;
    path4Tex.repeat.set(7, 7)
    let path4Material = new THREE.MeshPhongMaterial({
        map: path4Tex,
        side: THREE.DoubleSide,
    })

    let path4 = new THREE.Mesh(path4Geometry, path4Material)
    path4.rotation.x = Math.PI / 2
    path4.position.set(12, -0.8, -8)
    scene.add(path4)
}

// ÁRVORES
function spawnArvores() {
    // Tronco
    let troncoGeo = new THREE.CylinderGeometry(0.5, 0.5, 8)
    let troncoTex = new THREE.TextureLoader().load("./img/tree tex.png")
    let troncoMaterial = new THREE.MeshPhongMaterial({
        map: troncoTex
    })

    // Folhas
    let copaGeo = new THREE.ConeGeometry(4, 8, 20)
    copaGeo.castShadow = true;
    let copaTex = new THREE.TextureLoader().load("./img/pine.jpg")
    let copaMaterial = new THREE.MeshPhongMaterial({
        map: copaTex
    })

    // Folhas 2
    let copa2Geo = new THREE.ConeGeometry(3, 6, 20)
    let copa2Tex = new THREE.TextureLoader().load("./img/pineSnow.jpg")
    let copa2Material = new THREE.MeshPhongMaterial({
        map: copa2Tex
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
    arvore.position.set(20, 0.1, 5)
    let copa2 = new THREE.Mesh(copa2Geo, copa2Material)
    copa2.position.y = 5
    copa2.rotation.y = 5
    tronco.add(copa2)
    scene.add(arvore)

    arvore2 = new THREE.Object3D()
    //Tronco
    let tronco2 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco2.position.y = 3
    arvore2.add(tronco2)
    //Folhas
    let copa3 = new THREE.Mesh(copaGeo, copaMaterial)
    copa3.position.y = 3
    tronco2.add(copa3)
    arvore2.position.set(25, 0.1, -7)
    let copa4 = new THREE.Mesh(copa2Geo, copa2Material)
    copa4.position.y = 5
    copa4.rotation.y = 5
    tronco2.add(copa4)
    scene.add(arvore2)

    arvore3 = new THREE.Object3D()
    //Tronco
    let tronco3 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco3.position.y = 3
    arvore3.add(tronco3)
    //Folhas
    let copa5 = new THREE.Mesh(copaGeo, copaMaterial)
    copa5.position.y = 3
    tronco3.add(copa5)
    arvore3.position.set(20, 0.1, -15)
    let copa6 = new THREE.Mesh(copa2Geo, copa2Material)
    copa6.position.y = 5
    copa6.rotation.y = 5
    tronco3.add(copa6)
    scene.add(arvore3)

    arvore4 = new THREE.Object3D()
    //Tronco
    let tronco4 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco4.position.y = 3
    arvore4.add(tronco4)
    //Folhas
    let copa7 = new THREE.Mesh(copaGeo, copaMaterial)
    copa7.position.y = 3
    tronco4.add(copa7)
    arvore4.position.set(-20, 0.1, -26)
    let copa8 = new THREE.Mesh(copa2Geo, copa2Material)
    copa8.position.y = 5
    copa8.rotation.y = 5
    tronco4.add(copa8)
    scene.add(arvore4)

    arvore5 = new THREE.Object3D()
    //Tronco
    let tronco5 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco5.position.y = 3
    arvore5.add(tronco5)
    //Folhas
    let copa9 = new THREE.Mesh(copaGeo, copaMaterial)
    copa9.position.y = 3
    tronco5.add(copa9)
    arvore5.position.set(-30, 0.1, -15)
    let copa10 = new THREE.Mesh(copa2Geo, copa2Material)
    copa10.position.y = 5
    copa10.rotation.y = 5
    tronco5.add(copa10)
    scene.add(arvore5)

    arvore6 = new THREE.Object3D()
    //Tronco
    let tronco6 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco6.position.y = 3
    arvore6.add(tronco6)
    //Folhas
    let copa11 = new THREE.Mesh(copaGeo, copaMaterial)
    copa11.position.y = 3
    tronco6.add(copa11)
    arvore6.position.set(-20, 0.1, 26)
    let copa12 = new THREE.Mesh(copa2Geo, copa2Material)
    copa12.position.y = 5
    copa12.rotation.y = 5
    tronco6.add(copa12)
    scene.add(arvore6)

    arvore7 = new THREE.Object3D()
    //Tronco
    let tronco7 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco7.position.y = 3
    arvore7.add(tronco7)
    //Folhas
    let copa13 = new THREE.Mesh(copaGeo, copaMaterial)
    copa13.position.y = 3
    tronco7.add(copa13)
    arvore7.position.set(-30, 0.1, 15)
    let copa14 = new THREE.Mesh(copa2Geo, copa2Material)
    copa14.position.y = 5
    copa14.rotation.y = 5
    tronco7.add(copa14)
    scene.add(arvore7)

    arvore8 = new THREE.Object3D()
    //Tronco
    let tronco8 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco8.position.y = 3
    arvore8.add(tronco8)
    //Folhas
    let copa15 = new THREE.Mesh(copaGeo, copaMaterial)
    copa15.position.y = 3
    tronco8.add(copa15)
    arvore8.position.set(0, 0.1, 26)
    let copa16 = new THREE.Mesh(copa2Geo, copa2Material)
    copa16.position.y = 5
    copa16.rotation.y = 5
    tronco8.add(copa16)
    scene.add(arvore8)

    arvore9 = new THREE.Object3D()
    //Tronco
    let tronco9 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco9.position.y = 3
    arvore9.add(tronco9)
    //Folhas
    let copa17 = new THREE.Mesh(copaGeo, copaMaterial)
    copa17.position.y = 3
    tronco9.add(copa17)
    arvore9.position.set(-10, 0.1, 15)
    let copa18 = new THREE.Mesh(copa2Geo, copa2Material)
    copa18.position.y = 5
    copa18.rotation.y = 5
    tronco9.add(copa18)
    scene.add(arvore9)

    arvore10 = new THREE.Object3D()
    //Tronco
    let tronco10 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco10.position.y = 3
    arvore10.add(tronco10)
    //Folhas
    let copa19 = new THREE.Mesh(copaGeo, copaMaterial)
    copa19.position.y = 3
    tronco10.add(copa19)
    arvore10.position.set(20, 0.1, 30)
    let copa20 = new THREE.Mesh(copa2Geo, copa2Material)
    copa20.position.y = 5
    copa20.rotation.y = 5
    tronco10.add(copa20)
    scene.add(arvore10)

}

// BONECO DE NEVE
function spawnCharacter() {
    let ball1Geo = new THREE.SphereGeometry(2, 32, 32);
    let ball1Mat = new THREE.MeshPhongMaterial({
        color: 0xF5F5F5
    });
    let ball1 = new THREE.Mesh(ball1Geo, ball1Mat);
    ball1.position.set(0, 1, 0)
    ball1.castShadow = true;

    let ball2Geo = new THREE.SphereGeometry(1.5, 32, 32);
    let ball2Mat = new THREE.MeshPhongMaterial({
        color: 0xF5F5F5
    });
    let ball2 = new THREE.Mesh(ball2Geo, ball2Mat);
    ball2.position.set(0, 3.5, 0)
    ball2.castShadow = true;
    
    let hatGeo = new THREE.CylinderGeometry(.8, .8, 1, 32);
    let hatMat = new THREE.MeshPhongMaterial({
        color : 0x000000
    })
    let hat = new THREE.Mesh(hatGeo, hatMat);
    hat.position.set(0, 5, 0)
    hat.castShadow = true

    snowmen = new THREE.Object3D();
    snowmen.add(ball1,ball2,hat)
    snowmen.castShadow = true;
    scene.add(snowmen)
}

// BOLAS
function ball() {
    let geometry = new THREE.SphereGeometry(1,32,32)
    let material = new THREE.MeshPhongMaterial({color: 0xFF0000});
    let material2 = new THREE.MeshPhongMaterial({color: 0x00FF00});
    let material3 = new THREE.MeshPhongMaterial({color: 0x0000FF});
    sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(-2,2,-5)
    scene.add(sphere)
    sphere.castShadow = true;

    sphere2 = new THREE.Mesh(geometry, material)
    sphere2.position.set(-2,2,-5)
    scene.add(sphere2)

    sphere3 = new THREE.Mesh(geometry, material2)
    sphere3.position.set(-2,2,-5)
    scene.add(sphere3)

    sphere4 = new THREE.Mesh(geometry, material3)
    sphere4.position.set(-2,2,-5)
    scene.add(sphere4)

    sphere5 = new THREE.Mesh(geometry, material2)
    sphere5.position.set(-2,2,-5)
    scene.add(sphere5)

    sphere6 = new THREE.Mesh(geometry, material3)
    sphere6.position.set(-2,2,-5)
    scene.add(sphere6)

    sphere.visible = false;
    sphere2.visible = false;
    sphere3.visible = false;
    sphere4.visible = false;
    sphere5.visible = false;
    sphere6.visible = false;
}

function updateBalls() {
    pathSpeed += 0.004
    sphere.position.x = 30*Math.cos(pathSpeed-0.1);
    sphere.position.z = 30*Math.sin(pathSpeed-0.1);

    sphere2.position.x = 30*Math.cos(pathSpeed);
    sphere2.position.z = 30*Math.sin(pathSpeed);

    sphere3.position.x = 30*Math.cos(pathSpeed-0.2);
    sphere3.position.z = 30*Math.sin(pathSpeed-0.2);

    sphere4.position.x = 30*Math.cos(pathSpeed-0.3);
    sphere4.position.z = 30*Math.sin(pathSpeed-0.3);

    sphere5.position.x = 30*Math.cos(pathSpeed-0.4);
    sphere5.position.z = 30*Math.sin(pathSpeed-0.4);

    sphere6.position.x = 30*Math.cos(pathSpeed-0.5);
    sphere6.position.z = 30*Math.sin(pathSpeed-0.5);
}

/*function weather() {
    rainGeometry = new THREE.Geometry();
    for (let l = 0; l < rainCount; l++) {
        rainDrop = new THREE.Vector3(
            Math.random() * 100 -50,
            Math.random() * 50 -25,
            Math.random() * 100 -50,
        );
        rainDrop.velocity = {};
        rainDrop.velocity = 0;
        rainGeometry.vertices.push(rainDrop);
    }
    rainMaterial = new THREE.PointsMaterial({
        color: 0xffffff, size: 0.1, transparent: true
    });
    rain = new THREE.Points(rainGeometry, rainMaterial)
    scene.add(rain);
}

function snowFall() {
    rainGeometry.vertices.forEach(p => {
        p.velocity -= 0.00001;
        p.y += p.velocity;
        if(p.y < 0) {
            p.y = 40;
            p.velocity = 0;
        }
    });
    rainGeometry.verticesNeedUpdate = true;
}*/

// KEY HANDLERS
function handleKeyDown(e) {
    let char = e.key;
    console.log(char)
    if(e.keyCode === 32) {
        sphere.visible = true;
        sphere2.visible = true;
        sphere3.visible = true;
        sphere4.visible = true;
        sphere5.visible = true;
        sphere6.visible = true;
        console.log("active")
    }


    /*****************************
     * RENDER 
     * ***************************/
    renderer.render(scene, camera);
}

// ANIMATE
const animate = () => {
    updateBalls();
    //snowFall();
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}