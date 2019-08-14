import React, {
    Component
} from "react";
import * as THREE from "three";
// const OrbitControls = require("three-orbit-controls")(THREE);
class Canvas extends Component {
    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
        this.initializeCamera = this.initializeCamera.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = { x: 0, y: 0, width:window.innerWidth, height: window.innerHeight};
        this.renderButtons = this.renderButtons.bind(this);
    }

    updateDimensions() {
        if(window.innerWidth < 500) {
          this.setState({ width: 450, height: 102 });
        } else {
          let update_width  = window.innerWidth;
          let update_height = window.innerHeight;
          this.setState({ width: update_width, height: update_height });
        }
      }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
        const width = this.state.width;
        const height = this.state.height;
        this.scene = new THREE.Scene();
        this.mouse = new THREE.Vector2();
        this.camera = new THREE.PerspectiveCamera(1000, width / height, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

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

    componentDidUpdate() {
        this.mouse.x = this.state.x;
        this.mouse.y = this.state.y;
    }

    componentWillReceiveProps() {
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        this.renderButtons();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
    }


    onMouseMove(e) {
        this.setState({ x: e.screenX, y: e.screenY });
    }

    onClick(e) {
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        this.renderButtons();



    }
    renderButtons() {
        const points = this.props.state.links;
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
            context1.font = "normal 40px Tahoma, Geneva, sans-serif";
            context1.fillText(points[i], size / 2, size / 3);
            var texture1 = new THREE.Texture(canvas);
            texture1.needsUpdate = true;
            var star = new THREE.Vector3();
            star.x = THREE.Math.randFloatSpread(4);
            star.y = THREE.Math.randFloatSpread(4);
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
        banners.position.set(0, +2, 0)
    }


    initializeCamera() {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 7;
    }
    animate() {
        this.frameId = window.requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
        this.scene.children[0].rotation.z -= 0.001;
        for (let i = 0; i < this.scene.children[0].children.length; i++) {
            this.scene.children[0].children[i].position.z = (this.mouse.x - this.mouse.y) * 0.0005;
        }
    }

    render() {
        return (
            <div>
                <div onMouseMove={this.onMouseMove} onClick={this.onClick} id="boardCanvas" style={{
                    bottom: 0,
                    position: "absolute",
                    width: "100vw",
                    height: "100vh",
                    zIndex: 0
                }} ref={mount => { this.mount = mount; }} />
            </div>
        );
    }
}
export default Canvas;