async function CreateShader(gl,frag){

    var vertCode = await get('/shaders/default.vert')
         var fragCode = frag?frag:(await get('/shaders/default.frag'))

      function CreateShader(type,code){
         const shader = gl.createShader(type)
         gl.shaderSource(shader,code)
         gl.compileShader(shader)

         const message = gl.getShaderInfoLog(shader);

         if (message.length > 0) {
         /* message may be an error or a warning */
         throw message;
         }

         return shader
      }

         var vertShader = CreateShader(gl.VERTEX_SHADER,vertCode)
         var fragShader = CreateShader(gl.FRAGMENT_SHADER,fragCode);

         var program = gl.createProgram();
         gl.attachShader(program, vertShader);
         gl.attachShader(program, fragShader);
         gl.linkProgram(program);

    return {program}
    
}