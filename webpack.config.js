//webpack es una herramienta de nodejs 

module.exports  = {
    entry: './src/app/index.js', //entrada de webpack --> toma index.js, lo convierte y lo coloca dentro de carpeta public
    output: {
        path: __dirname + '/src/public',
        filename: 'bundle.js'   //todo el codigo convertido y compactado, unido en una sola linea para que pese menos
    },
    module: {
        rules: [
            {
                use: 'babel-loader', //para que webpack utilice babel loader y traducir el codigo
                test: /\.js$/,  //expresion regular que le dice que tome todos los archivos JS que encuentre
                exclude: /node_modules/ //excepto los de node modules
            } 
        ]   
    }
};

//creamos public/bundle.js y luego importamos bundle.js con index.html