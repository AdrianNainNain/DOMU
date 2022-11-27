import { NearBindgen, near, call, view, initialize, UnorderedMap } from 'near-sdk-js'
import { assert } from './utils'
import { Propiedades, STORAGE_COST } from './models'

@NearBindgen({})
class RentaVacacional {
  propiedades = new UnorderedMap<Propiedades>('map-uid-1');
  owner_id = "rentavacacional.testnet"
  
  @initialize({ privateFunction: true })
  init({ owner_id }: { owner_id: string }) {
    this.owner_id = owner_id
  }

  @call({})
  registrar_propiedad({nombre, direccion, dimensiones, baños, roomservice, habitaciones}:
    {nombre:string, direccion:string, dimensiones:string, baños:number, roomservice:boolean, habitaciones:number}) {
    // Get who is calling the method and how much $NEAR they attached
    let account_id = near.predecessorAccountId();
    let registro: Propiedades = { nombre: nombre, direccion: direccion, dimensiones:dimensiones, baños:baños, roomservice:roomservice, habitaciones:habitaciones};
    this.propiedades.set(account_id,registro);
    
    return this.propiedades.toString()
  }

}
