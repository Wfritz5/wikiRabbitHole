import React, {
    Component
} from "react";
import * as THREE from "three";
import {
    wrapText
} from "../../utils/wrapText";
// const OrbitControls = require("three-orbit-controls")(THREE);
class Canvas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };

    }

    updateDimensions = () => {
        let update_width = window.innerWidth;
        let update_height = window.innerHeight;
        this.setState({
            width: update_width,
            height: update_height
        });
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
        window.addEventListener('mousemove', this.raycast.bind(this), false);
        window.addEventListener('click', this.onClick.bind(this));
        const width = this.state.width;
        const height = this.state.height;
        this.scene = new THREE.Scene();
        this.mouse = new THREE.Vector2();
        this.camera = new THREE.PerspectiveCamera(1000, width / height, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.raycaster = new THREE.Raycaster();
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        // this.initializeOrbits();
        this.initializeCamera();
        this.renderer.setClearColor(0xffffff, 0);
        this.renderButtons();
        this.animate();
        console.log(`${window.innerWidth},${window.innerHeight}`)
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     if (this.props.state !== nextProps.state){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }

    componentDidUpdate() {
        this.mount.removeChild(this.renderer.domElement);
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        this.renderButtons();
        this.renderCentral();
        this.renderer.setSize(this.state.width, this.state.height);
        this.mount.appendChild(this.renderer.domElement);

    }

    componentWillReceiveProps(nextProps) {
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        window.removeEventListener("resize", this.updateDimensions.bind(this));
        window.removeEventListener("mousemove", this.raycast.bind(this));
        window.removeEventListener("click", this.onClick.bind(this));
        this.mount.removeChild(this.renderer.domElement);
    }


    onMouseMove = (e) => {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    }

    raycast = (e) => {
        if (this.props) {
            this.intersects = this.raycaster.intersectObjects(this.scene.children[0].children);
            this.raycaster.setFromCamera(this.mouse, this.camera);
            for (var i = 0; i < this.scene.children[0].children.length; i++) {
                if (this.intersects.length) {
                    if (this.intersects[0].object === this.scene.children[0].children[i]) {
                        this.scene.children[0].children[i].material.color.setHex("0xff0000")
                    } else {
                        this.scene.children[0].children[i].material.color.setHex("0xffffff")
                    }
                } else {
                    this.scene.children[0].children[i].material.color.setHex("0xffffff")
                }
            }
        }
    }
    onClick = (e) => {
        for (var i = 0; i < this.scene.children[0].children.length; i++) {
            if (this.intersects.length) {
                if (this.intersects[0].object === this.scene.children[0].children[i]) {
                    this.props.scrape("https://en." + this.scene.children[0].children[i].name)
                }
            }
        }
    }


    renderCentral = () => {
        const title = this.props.state.title;
        var starGeometry = new THREE.Geometry();
        var canvas = document.createElement("canvas");
        var size = 1024;
        canvas.width = size;
        canvas.height = size;
        var context1 = canvas.getContext("2d");
        context1.fillStyle = "#686868";
        context1.textAlign = "center";
        context1.font = "bold 60px Tahoma, Geneva, sans-serif";
        wrapText(context1, title, size / 2, size / 2, 300, 65)
        var texture1 = new THREE.Texture(canvas);
        texture1.needsUpdate = true;
        var star = new THREE.Vector3();
        star.x = 0;
        star.y = 0;
        star.z = 0;
        starGeometry.vertices.push(star);
        var textMaterial = new THREE.PointsMaterial({
            size: 10,
            map: texture1,
            depthTest: false,
            transparent: true
        });

        var banner = new THREE.Points(starGeometry, textMaterial);
        this.scene.add(banner);
        banner.position.set(0, 0, -3);
        console.log(`done:${this.props.state.title}`);
    }
    renderButtons = () => {
        const points = this.props.state.linkTitles;
        const hrefs = this.props.state.links;
        var banners = new THREE.Group();
        for (var i = 0; i < points.length; i++) {
            var starGeometry = new THREE.Geometry();
            var canvas = document.createElement("canvas");
            var size = 1024;
            canvas.width = size;
            canvas.height = size;
            var context1 = canvas.getContext("2d");
            context1.fillStyle = "#ffffff";
            context1.textAlign = "center";
            context1.font = "normal 38px Tahoma, Geneva, sans-serif";
            wrapText(context1, points[i], size / 2, size / 2, 300, 45)
            var texture1 = new THREE.Texture(canvas);
            texture1.needsUpdate = true;
            var star = new THREE.Vector3();
            star.x = THREE.Math.randFloatSpread(10);
            star.y = THREE.Math.randFloatSpread(10);
            // star.z = THREE.Math.randFloatSpread(2);
            if (star.y < 0 && star.y > -1) {
                star.y -= 1
            }
            if (star.y > 0 && star.y < 1) {
                star.y += 1
            }
            if (star.x < 0 && star.x > -1) {
                star.x -= -1
            }
            if (star.x > 0 && star.x < 1) {
                star.x += 1
            }
            starGeometry.vertices.push(star);
            var textMaterial = new THREE.PointsMaterial({
                size: 10,
                map: texture1,
                depthTest: false,
                transparent: true
            });
            var banner = new THREE.Points(starGeometry, textMaterial);
            banner.name = hrefs[i];
            banners.add(banner);
        }

        this.scene.add(banners);
        banners.position.set(0, 0, 0)
    }


    initializeCamera = () => {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 0;
    }
    animate = () => {
        this.frameId = window.requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
        this.scene.children[0].rotation.z -= 0.001;
        this.camera.position.z = (this.mouse.x - this.mouse.y) * 0.2 + 10;
        if (this.scene.children[1]) {
            this.scene.children[1].position.z = (this.mouse.x - this.mouse.y) * .25 - 3;
        }
        // this.scene.children[0].rotation.y += 0.0005;
    }

    render() {
        return ( <div>
                    <div onMouseMove = {this.onMouseMove}
                    id = "boardCanvas"
                    style = {{
                            bottom: 0,
                            position: "absolute",
                            width: "100vw",
                            height: "100vh",
                            zIndex: 0
                        }}
                    ref = {mount => {this.mount = mount;}}/> 
                </div>
        );
    }
}
export default Canvas;