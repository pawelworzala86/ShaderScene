function CreateMesh(gl,meshshader,geometry){


   const texture = loadTexture(gl, "/textures/worzala.png");

     function CreateBuffer(type,data){
      const buffer = gl.createBuffer()
      gl.bindBuffer(type, buffer)
      gl.bufferData(type, data, gl.STATIC_DRAW)
      return buffer
   }

    var buffer={}
    var shader = meshshader

    buffer.vertex = CreateBuffer(gl.ARRAY_BUFFER,new Float32Array(geometry.vertices))
    buffer.coords = CreateBuffer(gl.ARRAY_BUFFER,new Float32Array(geometry.coords));
    if(geometry.indices){
        buffer.index = CreateBuffer(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(geometry.indices));
        }
        
            function SetAttribute4M(name,value){
               const uniform = gl.getUniformLocation(shader.program, name)
               gl.uniformMatrix4fv(uniform, false, value)
            }
            function SetAttributeBuffer(name,buffer,elemCount){
               gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
               const attribute = gl.getAttribLocation(shader.program, name)
               gl.vertexAttribPointer(attribute, elemCount, gl.FLOAT, false,0,0)
               gl.enableVertexAttribArray(attribute)
            }

    return {buffer,type:gl.TRIANGLES,
           render(shader,proj_matrix,view_matrix,mo_matrix){



            gl.useProgram(shader.program);
     

         SetAttributeBuffer('position', buffer.vertex,3)
         SetAttributeBuffer('coord', buffer.coords,2)




         SetAttribute4M('Pmatrix', proj_matrix)
         SetAttribute4M('Vmatrix', view_matrix)
         SetAttribute4M('Mmatrix', mo_matrix)


         gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        var uniformLocation = gl.getUniformLocation(shader.program, "diffuseTexture");
        //printf("%i",uniformLocation);
        gl.uniform1i(uniformLocation, 0);


        //iResolution
        var canvas = document.querySelector('canvas')
         var iResolution = [canvas.width,canvas.height,0]
         var uniformLocation = gl.getUniformLocation(shader.program, "iResolution");
        gl.uniform3fv(uniformLocation, iResolution);

        //iTime
        var uniformLocation = gl.getUniformLocation(shader.program, "iTime");
       gl.uniform1f(uniformLocation, iTime);

       //iTimeDelta
       var uniformLocation = gl.getUniformLocation(shader.program, "iTimeDelta");
       gl.uniform1f(uniformLocation, iTimeDelta);


       //iFrameRate
       var uniformLocation = gl.getUniformLocation(shader.program, "iFrameRate");
       gl.uniform1f(uniformLocation, iFrameRate);

       //iFrame
       var uniformLocation = gl.getUniformLocation(shader.program, "iFrame");
       gl.uniform1i(uniformLocation, iFrame);

       //iMouse
       var uniformLocation = gl.getUniformLocation(shader.program, "iMouse");
       gl.uniform4fv(uniformLocation, iMouse);
               
               if(geometry.indices){
                   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.index);
                   gl.drawElements(this.type, geometry.indices.length, gl.UNSIGNED_SHORT, 0);
               }else{
                  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertex);
                  gl.drawArrays(this.type, 0, geometry.vertices.length/3);
                }
               
           },
            }

    
}