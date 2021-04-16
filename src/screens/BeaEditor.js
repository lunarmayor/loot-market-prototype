import React, { useEffect } from "react";
import { Box, Flex } from "../ui/layouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as THREE from "three";
import FBXLoader from "three-fbxloader-offical";
import beaModel from "../assets/bea_geo_out/bea_geo.gltf";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import supercellLogo from "../assets/supercelllogo.png";
import {
  faDownload,
  faHeart,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

const BeaEditor = ({ setActiveImage, sideBar }) => {
  useEffect(() => {
    let container = document.getElementById("bea");
    let { width, height } = container.getBoundingClientRect();

    const scene = new THREE.Scene();
    let clock = new THREE.Clock();
    const light = new THREE.AmbientLight(0xf5f5f5f5);
    scene.add(light);

    let camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 0, 30);
    camera.lookAt(0, 1, 0);

    scene.background = new THREE.Color(0xffffff);
    scene.background = new THREE.Color(0x1fa9f5);
    const hemiLight = new THREE.HemisphereLight(0xf5f5f5f5, 0x444444);
    hemiLight.position.set(0, 20, -40);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xf5f5f5f5);
    dirLight.position.set(-3, 10, -40);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = -2;
    dirLight.shadow.camera.left = -2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    //scene.add(dirLight);

    const loader = new FBXLoader();

    loader.load(process.env.PUBLIC_URL + "/bea/bea_geo.fbx", function(gltf) {
      let model = gltf;
      console.log(model);
      console.log(gltf.children[0].children[0].children);
      gltf.children[0].children[0].children.map(child => {
        child.material.customProgramCacheKey = () => {};
      });

      var box = new THREE.Box3().setFromObject(model);
      var center = new THREE.Vector3();
      box.getCenter(center);
      model.position.sub(center); // center the model
      scene.add(model);

      //model.material.customProgramCacheKey = () => {};

      const animations = gltf.animations;
      console.log(animations);

      //let mixer = new THREE.AnimationMixer(model);

      let renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      //renderer.outputEncoding = THREE.sRGBEncoding;
      //renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);

      function animate() {
        // Render loop

        requestAnimationFrame(animate);

        //let mixerUpdateDelta = clock.getDelta();

        // If in single step mode, make one step and then do nothing (until the user clicks again)

        // Update the animation mixer, the stats panel, and render this frame

        //mixer.update(mixerUpdateDelta);

        renderer.render(scene, camera);
      }
      animate();
    });
  }, []);
  return (
    <Flex flex={1} style={{ position: "relative", overflow: "hidden" }}>
      <Flex
        onClick={() => setActiveImage(null)}
        bg="white"
        style={{
          border: "1px solid #ddd",
          position: "absolute",
          top: 18,
          left: 18,
          zIndex: 1000,
          borderRadius: 1000
        }}
        justifyContent="center"
        alignItems="center"
        width={50}
        height={50}
      >
        <FontAwesomeIcon icon={faTimes} size="lg" color="rgba(0,0,0,0.7)" />
      </Flex>
      <Box
        id="bea"
        width={2 / 3}
        height="100%"
        style={{ borderRight: "1px solid #ddd", overflow: "hidden" }}
      ></Box>
      {sideBar}
    </Flex>
  );
};

export default BeaEditor;
