const text = document.querySelector('input');
const qrcode = document.querySelector('img');

const qrCodeBase = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOBSURBVO3BO67kWgIDweSB9r/lnDaeQUuAoKrbn2FE/IWZ/xxmymGmHGbKYaYcZsphphxmymGmHGbKYaYcZsphphxmymGmHGbKxUtJ+Ekqd5LQVFoS7qg8kYSm0pLwk1TeOMyUw0w5zJSLD1P5pCR8kkpLwp0kfJLKJyXhkw4z5TBTDjPl4suS8ITKE0n4SSotCW8k4QmVbzrMlMNMOcyUi3+MSkvCHZWWhDtJ+JcdZsphphxmysU/TuVOEu6o3EnCv+QwUw4z5TBTLr5M5XdKwhMqLQl3VN5Q+ZMcZsphphxmysWHJeFPptKS8IRKS0JTuZOEP9lhphxmymGmXLyk8jdTuaPSktBU7qj8TQ4z5TBTDjPl4qUkNJWWhE9SaSpPJKGptCR8UhI+SeWbDjPlMFMOM+Xih6ncSUJTaUloKndU7iShqbyRhKbSktBUWhJ+p8NMOcyUw0y5+LAkvKHSkvBEEprKE0loKi0JTyShqbyRhDsqbxxmymGmHGbKxUsqbyThjsobSWgqd1RaEp5QeUPlThK+6TBTDjPlMFMuXkpCU3lDpSWhqbQkvKHSknBH5U4S7qi0JPxJDjPlMFMOM+Xiw5LwhEpLQlN5Q+VOEu6oPKHyhEpLQlP5SYeZcpgph5kSf+GFJDSVloQ7KneS0FTuJKGpPJGEJ1SeSEJTeSIJd1TeOMyUw0w5zJSLL1O5k4Q7Ki0JTyShqbQkNJWWhCeS8EQS7qjcUfmkw0w5zJTDTLn4YUloKi0JLQlN5YkkPJGEJ5LwTUloKi0JTeWNw0w5zJTDTIm/8BdLwhMqd5LQVFoS7qg8kYQ7Ki0Jd1TeOMyUw0w5zJSLl5Lwk1SaSktCU2lJuKPSktBUWhLuJKGp/MkOM+UwUw4z5eLDVD4pCXeS0FSeUHkiCU+oPKFyR+WbDjPlMFMOM+Xiy5LwhMobSWgqb6i0JNxJwhtJeEPljcNMOcyUw0y5+D+j0pJwR6WptCQ8odKScEelJeGbDjPlMFMOM+XiH6PyhEpLQktCU7mjcicJTaUloSWhqbQkfNJhphxmymGmXHyZyjep3ElCU2lJuKPSknAnCW+o/E6HmXKYKYeZcvFhSfhJSWgqTeUJlZaEpvJEEp5Iwu90mCmHmXKYKfEXZv5zmCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKf8Dcp98JiK+o+kAAAAASUVORK5CYII='

qrcode.src = qrCodeBase;

text.addEventListener('keyup', (e) => {
    (async () => {
        if (!text.value) {
            qrcode.src = qrCodeBase;
            return;
        }
        await fetch('http://localhost:3000/qrcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: text.value }),
        })
            .then(data => {
                if (!data.ok) {
                    throw Error(data.status);
                }
                return data.json();
            }).then(update => {
                qrcode.src = update.url
            }).catch(e => {
                console.log(`Erro de Servidor: ${e}`);
            });
    })()
})