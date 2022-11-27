import { NearBindgen, near, call, view, initialize, UnorderedMap } from 'near-sdk-js'
import { assert } from './utils'
import { Propiedades, STORAGE_COST } from './models'
import { NearPromise } from 'near-sdk-js'
import { PublicKey } from 'near-sdk-js/lib/types'

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

  // @call({ privateFunction: true })
  // change_beneficiary(beneficiary) {
  //   this.beneficiary = beneficiary;
  // }

  // @view({})
  // get_beneficiary(): string { return this.beneficiary }

  // @view({})
  // number_of_donors(): number  { return this.donations.length }

  // @view({})
  // get_donations({ from_index = 0, limit = 50 }: { from_index: number, limit: number }): Donation[] {
  //   let ret: Donation[] = []
  //   let end = Math.min(limit, this.donations.length)
  //   for (let i = from_index; i < end; i++) {
  //     const account_id: string = this.donations.keys.get(i) as string
  //     const donation: Donation = this.get_donation_for_account({ account_id })
  //     ret.push(donation)
  //   }
  //   return ret
  // }

  // @view({})
  // get_donation_for_account({ account_id }: { account_id: string }): Donation {
  //   return {
  //     account_id,
  //     total_amount: this.donations.get(account_id).toString()
  //   }
  // }

}