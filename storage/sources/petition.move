module storage::petition {
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::table::{Self, Table};

    public struct Petition has key {
        id: object::UID,
        owner: address,
        support: u64,
        supporters: Table<address, bool>,
        donation: u64,
    }

    public entry fun create_petition(ctx: &mut TxContext) {
        let petition_obj = Petition {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            support: 0,
            supporters: table::new(ctx),
            donation: 0,
        };
        transfer::share_object(petition_obj);
    }

    public entry fun support(pet: &mut Petition, ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx);

        if (table::contains(&pet.supporters, sender)) {
            abort 0
        };

        table::add(&mut pet.supporters, sender, true);
        pet.support = pet.support + 1;
    }

    public entry fun send_donation(pet: &mut Petition, coin: Coin<SUI>, _ctx: &mut TxContext) {
        pet.donation = pet.donation + coin::value(&coin);
        transfer::public_transfer(coin, pet.owner);
    }
}
