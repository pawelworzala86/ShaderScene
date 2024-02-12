async function CreateModel(gl,shader){

        var geometry = GetPanel()//GetCube()


   //var shader = await CreateShader(gl)

    var meshes = []
    
    var mesh = CreateMesh(gl, shader, geometry)
    //mesh.type = gl.LINES
    meshes.push(mesh)

    var mo_matrix = mat4.create()

    return {
        mo_matrix,

        render(proj_matrix,view_matrix){

            for(let mesh of meshes){
                
                mesh.render(shader,proj_matrix,view_matrix,this.mo_matrix)
                
            }
            
        }
    }

}