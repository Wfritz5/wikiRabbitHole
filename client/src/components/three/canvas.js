import React, { Component } from "react";
import * as THREE from "three";
// const OrbitControls = require("three-orbit-controls")(THREE);
class Canvas extends Component {
    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
        this.addCube = this.addCube.bind(this);
        this.initializeCamera = this.initializeCamera.bind(this);
        // this.initializeOrbits = this.initializeOrbits.bind(this);
    }
    componentDidUpdate() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        const points = this.props.state.links;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(100, width / height, 0.001, 10000);
        this.camera.position.set(0, 0, 200)
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setClearColor(0xffffff, 0);

        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        // this.initializeOrbits();
        this.initializeCamera();

        var banners = new THREE.Group();
        for (var i = 0; i < points.length; i++) {
            var starGeometry = new THREE.Geometry();
            var canvas = document.createElement("canvas");
            var size = 1024;
            canvas.width = size;
            canvas.height = size;
            var context1 = canvas.getContext("2d");
            context1.fillStyle = "#FFFFFF";
            context1.textAlign = "left";
            context1.font = "normal 24px Tahoma, Geneva, sans-serif";
            context1.fillText(points[i], size / 2, size / 3);
            var texture1 = new THREE.Texture(canvas);
            texture1.needsUpdate = true;
            var star = new THREE.Vector3();
            star.x = THREE.Math.randFloatSpread(3);
            star.y = THREE.Math.randFloatSpread(5);
            star.z = THREE.Math.randFloatSpread(1);
            starGeometry.vertices.push(star);
            var textMaterial = new THREE.PointsMaterial({
                size: 10,
                map: texture1,
                depthTest: false,
                transparent: true
            });

            var banner = new THREE.Points(starGeometry, textMaterial);

            switch (i) {
                case i:
                    banner.name = points[i];
                    break;
            }

            banners.add(banner);
        }

        this.scene.add(banners);
        banners.position.set(0, -2.5, 0)
        console.log(this.scene)
        this.animate();
    }
    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
    }
    // initializeOrbits() {
    //     this.controls.rotateSpeed = 1.0;
    //     this.controls.zoomSpeed = 1.2;
    //     this.controls.panSpeed = 0.8;
    // }
    initializeCamera() {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 4;
    }
    animate() {
        this.frameId = window.requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
        for (var i in this.scene.children.children) {
            this.scene.children[0].children[i].rotation.x += Math.random();
        }

    }
    addCube(cube) {
        this.scene.add(cube);
    }
    render() {
        return (
            <div>
                <div
                    id="boardCanvas"
                    style={{ bottom: 0, position: "absolute", width: "100vw", height: "100vh", zIndex: 0 }}
                    ref={mount => {
                        this.mount = mount;
                    }}
                />
            </div>
        );
    }
}
export default Canvas;