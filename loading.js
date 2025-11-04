
var app_version = '2025.11.03';

pc.script.createLoadingScreen(function (app) {

    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var logo = document.createElement('img');
        logo.src = 'https://feriavocacional.uned.ac.cr/wp-content/uploads/2023/10/logoferia.svg';
        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };

        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

        var percent = document.createElement('div');
        percent.id = 'progress-bar-percent';
        document.body.appendChild(percent);

        var versionText = document.createElement('div');
        versionText.id = 'version-text';
        versionText.innerHTML = 'v' + app_version;
        wrapper.appendChild(versionText);

    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if(bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
            var percent = parseInt(value * 100) + '%';
            document.getElementById('progress-bar-percent').innerHTML = 'Cargando ... ' + percent;
            if(percent == "100%")
                document.getElementById('progress-bar-percent').remove();
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background: radial-gradient(ellipse farthest-corner at 50% 50%, #9B6FF3 0%, #4A66C1 100%);',
            '}',
            '',
            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #1e4fa1;',
            '}',
            '',
            '#application-splash {',
            '    position: absolute;',
            '    top: calc(50% - 120px);',
            '    width: 300px;',
            '    left: calc(50% - 140px);',
            '    text-align: center;',
            '}',
            '',
            '#application-splash img {',
            '    width: 80%;',
            '}',
            '',
            '#progress-bar-percent {',
            '    position: absolute;',
            '    top: calc(50% + 30px);',
            '    width: 300px;',
            '    left: calc(50% - 140px);',
            '    text-align: center;',
            '    color: #dedcfc;',
            '    font-size: 1em;',
            '    font-weight: bold;',
            '    font-family: Courier New;',
            '}',
            '#progress-bar-container {',
            '    margin: 20px auto 0 auto;',
            '    height: 10px;',
            '    width: 100%;',
            '    background-color: #0D3996;',
            '    border-radius: 25px;',
            '}',
            '',
            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #ffc113;',
            '    border-radius: 25px;',
            '}',
            '#version-text {',
            '    position: absolute;',
            '    bottom: 5px;',
            '    right: 5px;',
            '    color: #dedcfc;',
            '    font-size: 0.5em;',
            '    font-family: Courier New;',
            '}',
            '',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 170px;',
            '        left: calc(50% - 85px);',
            '    }',
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };

    createCss();
    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});