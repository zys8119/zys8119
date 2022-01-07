<template>
    <div class="AnimationTime">
        <div id="canvas_container"></div>

        <p id=github>
            <a href="https://github.com/zys8119" target="_blank">
                <img src="https://yoshihitofujiwara.github.io/icon_white.png" width="40" height="40" alt="Github" />
            </a>
        </p>
    </div>
</template>

<script setup>
onMounted(()=>{
    class RenderManeger3D {
        /**
         * constructor
         * @param  {jQuery} $container canvas container
         * @param  {Object} oprions
         */
        constructor($container, options) {
            this.$container = $container;

            this.options = $.extend(true, {
                isController: false,
                isAxis: false,
                isGui: true,
                isStats: true
            }, options);

            this.width = this.$container.width();
            this.height = this.$container.height();

            this.startTime = null;
            this.time = null;
            this._animationId = null;

            // event: [start, stop, resize, update]
            this.event = new INK.Events();

            // stats
            this.stats = new Stats();

            this.$container[0].appendChild(this.stats.dom);

            if (!this.options.isStats){
                $(this.stats.domElement).css({ display: 'none' });
            }

            // gui
            if (this.options.isGui) {
                this.gui = new dat.GUI();

                this.gui.params = {};
                this.gui.params.stats = this.options.isStats;
                this.gui.add(this.gui.params, 'stats').name('FPS Metor').onChange(() => {
                    if (this.gui.params.stats) {
                        $(this.stats.domElement).css('display', 'block');
                    } else {
                        $(this.stats.domElement).css('display', 'none');
                    }
                });
            }

            // renderer
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setClearColor(0x000000);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(this.width, this.height);

            // scene
            this.scene = new THREE.Scene();

            // camera
            this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.01, 10000);
            this.camera.position.set(0, 0, 10);
            this.camera.aspect = this.width / this.height;

            if (this.options.isController) {
                this.controller = new THREE.OrbitControls(this.camera, this.renderer.domElement);
                this.controller.autoRotate = false;
                this.controller.autoRotateSpeed = 5.0;
            }

            // AxisHelper
            if (this.options.isAxis) {
                this.axis = new THREE.AxisHelper(1000);
                this.scene.add(this.axis);
            }

            this.$container[0].appendChild(this.renderer.domElement);

            // resize
            $(window).resize(this.resize.bind(this));
        }

        /**
         * start
         */
        start() {
            this.startTime = performance.now();
            cancelAnimationFrame(this._animationId);
            this.event.trigger('start', this);
            this.update();
        }

        /**
         * stop
         */
        stop() {
            cancelAnimationFrame(this._animationId);
            this.event.trigger('stop', this);
        }

        /**
         * update
         */
        update() {
            this.time = (performance.now() - this.startTime) / 1000;
            this._animationId = requestAnimationFrame(this.update.bind(this));

            this.event.trigger('update', this);
            this.render();

            if (this.controller) {
                this.controller.update();
            }
            if (this.gui.params.stats) {
                this.stats.update();
            }
        }

        /**
         * render
         */
        render() {
            this.renderer.render(this.scene, this.camera);
        }

        /**
         * resize
         */
        resize() {
            this.width = this.$container.width();
            this.height = this.$container.height();
            this.renderer.setSize(this.width, this.height);
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.event.trigger('resize', this);
        }
    }

    /*--------------------------------------------------------------------------
      parameter
    --------------------------------------------------------------------------*/
    let renderManeger3D;

// 数値のパーティクル座標管理リスト
    let numberList = [];

// 表示時間のパーティクルリスト（文字単位）
    let particleSystemList = [];

// パーティクル用テクスチャ
    let texture;

// font data
    let fontData;

// 現在時
    let now = getNow();


    /*--------------------------------------------------------------------------
      init
    --------------------------------------------------------------------------*/
    function init() {
        console.log($("#canvas_container"));
        renderManeger3D = new RenderManeger3D($("#canvas_container"), {
            isController: true
        });

        // 文字単位のパーティクル量(初期値)
        renderManeger3D.gui.params.particles = 5000 * 6;
        renderManeger3D.gui.params.size = 1.0;

        // 表示する時間のパーティクルを生成
        texture = new THREE.TextureLoader().load("https://yoshihitofujiwara.github.io/particle-clock/assets/img/icon.png");
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;

        // 数値のパーティクル座標管理リストの生成
        // font loader
        let loader = new THREE.FontLoader();
        let typeface = "https://yoshihitofujiwara.github.io/particle-clock/assets/fonts/helvetiker_bold.typeface.json?" + performance.now();

        loader.load(typeface, (font) => {
            fontData = font;

            // dat.gui
            renderManeger3D.gui.add(renderManeger3D.gui.params, 'particles', 500, 100000).step(10).onChange((val) => {
                createParticle();
            });
            renderManeger3D.gui.add(renderManeger3D.gui.params, 'size', 0.1, 2).onChange((val) => {
                createParticle();
            });

            // パーティクル生成
            createParticle();

            // start
            renderManeger3D.start();
        });

        // camera positon
        if (INK.isSmartPhone()) {
            renderManeger3D.camera.position.z = 360;
        } else {
            renderManeger3D.camera.position.z = 120;
        }

        // update
        renderManeger3D.event.on("update", () => {
            particleSystemList.forEach((psList, i) => {
                psList.particles.verticesNeedUpdate = true;
                psList.particleSystem.material.color.setHSL((Math.sin((renderManeger3D.time + (i / now.length * INK.TWO_PI)) * 0.2) + 1) / 2, 0.5, 0.5);
            });

            let _now = getNow();
            if (now != _now) {
                for (let i = 0; i < now.length; i++) {
                    if (now[i] != _now[i]) {
                        morphTo(i, +_now[i]);
                    }
                }
                now = _now;
            }
        });
    }


    /*--------------------------------------------------------------------------
      createParticle
    --------------------------------------------------------------------------*/
    function createParticle(){
        for (let i = 0; i < 10; ++i) {
            numberList[i] = {};

            // TextGeometry
            numberList[i].geometry = new THREE.TextGeometry(i, {
                font: fontData,
                size: 40,
                height: 8,
                curveSegments: 10,
            });

            // ジオメトリを中点の中央に配置
            numberList[i].geometry.center();

            // Geometry パーティクル管理用
            numberList[i].particles = new THREE.Geometry();

            // TextGeometry内にランダムな頂点を追加
            numberList[i].particles.vertices = THREE.GeometryUtils.randomPointsInGeometry(numberList[i].geometry, renderManeger3D.gui.params.particles / 6);
        }

        // パーティクル削除
        renderManeger3D.scene.remove.apply(renderManeger3D.scene, renderManeger3D.scene.children);

        // パーティクル追加
        for (let j = 0; j < now.length; ++j) {
            let particles = new THREE.Geometry();

            particles.vertices = numberList[+now[j]].particles.clone(numberList[+now[j]].particles).vertices;

            let material = new THREE.PointsMaterial({
                size: renderManeger3D.gui.params.size * window.devicePixelRatio,
                map: texture,
                blending: THREE.AdditiveBlending,
                depthTest: false,
                transparent: true
            });

            let particleSystem = new THREE.Points(particles, material);
            // particleSystem.sortParticles = true;

            // 文字を中央配置
            particleSystem.position.x = 34 * j - (34 * 2.55);

            // 時間管理用パーティクル
            particleSystemList[j] = {
                particleSystem: particleSystem,
                particles: particles
            };

            renderManeger3D.scene.add(particleSystem);
        }
    }


    /*--------------------------------------------------------------------------
      utils
    --------------------------------------------------------------------------*/
    /**
     * @method morphTo モーフィングアニメーション
     * @param {Number} index 桁数（頭から数えて）
     * @param {Number} num アニメーションする数字
     */
    function morphTo(index, num) {
        let psList = particleSystemList[index];
        let p = numberList[num].particles;

        for (let i = 0; i < psList.particles.vertices.length; i++) {
            TweenMax.to(psList.particles.vertices[i], .7, {
                ease: Expo.easeInOut,
                x: p.vertices[i].x,
                y: p.vertices[i].y,
                z: p.vertices[i].z
            });
        }
    }

    /**
     * @method getNow 現在の時、分、秒を文字列にして返す
     * @return {String}
     */
    function getNow() {
        let date = new Date();
        return zeroPadding(date.getHours()) + zeroPadding(date.getMinutes()) + zeroPadding(date.getSeconds());
    }

    /**
     * @method zeroPadding 1桁の場合、先頭に0を追加して2桁にする
     * @param {Number} num
     * @return {String}
     */
    function zeroPadding(num) {
        let numStr = "" + num;
        if (numStr.length < 2) {
            numStr = "0" + numStr;
        }
        return numStr;
    }


    /*==========================================================================
      DOM READY
    ==========================================================================*/

    $(() => {
        init();
    });
})
</script>

<style scoped lang="less">
.AnimationTime {
    #canvas_container{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    #github{
        position: absolute;
        right: 20px;
        bottom: 10px;
    }
}
</style>
