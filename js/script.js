
let container = document.querySelector(".container")
async function showRegions () {
    let respuesta = await fetch ('http://localhost:3000/country')
    let ciudades = await respuesta.json()
    return ciudades
    // .then((response)=> {
    //     return response.json()
        
        
    // }) 
    // .then((resp)=> {
    //     let regions = []
    //     resp.forEach(element => {
    //         if(!regions.includes(element.region_name)) {
    //             regions.push(element.region_name)
    //         }
    //     });
    //     return regions;
    // })
    
}
showRegions().then((resp)=> {
        console.log(resp)
        let regions = []
        resp.forEach(element => {
            if(!regions.includes(element.region_name)) {
                regions.push(element.region_name)
            }
        });
        console.log(regions)

        regions.forEach(element => {
            container.innerHTML += `
                <div class="card m-5">
                    <div class="card-header d-flex align-items-center gap-3 bg-dark text-light">
                        <strong>${element}</strong>
                        <a href="#" class="text-secondary"><i class="fas fa-pen"></i></a>
                        <a href="#" class="text-danger"><i class="fas fa-trash-alt"></i></a>
                        <button class="btn btn-sm btn-primary ms-auto">+ Agregar país</button>
                    </div>
                    <div class="card-body p-4">
                        <div class="card">
                            <div class="card-header d-flex align-items-center gap-3">
                                <strong>México</strong>
                                <a href="#" class="text-secondary"><i class="fas fa-pen"></i></a>
                                <a href="#" class="text-danger"><i class="fas fa-trash-alt"></i></a>
                                <button class="btn btn-sm btn-primary ms-auto">+ Agregar ciudad</button>
                            </div>
                            <div class="card-body d-flex flex-column gap-3 p-4">
                                <div class="card">
                                    <div class="card-body d-flex gap-3">
                                        <span>Tulum</span>
                                        <a href="#" class="text-secondary"><i class="fas fa-pen"></i></a>
                                        <a href="#" class="text-danger"><i class="fas fa-trash-alt"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        })
    })