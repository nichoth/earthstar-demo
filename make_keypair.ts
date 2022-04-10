import * as Earthstar from 'https://deno.land/x/earthstar@8.2.4/mod.ts';

const keypair = await Earthstar.crypto.generateAuthorKeypair('blog')

if (!Earthstar.isErr(keypair)) {
    await Deno.writeTextFile("identity.json", keypair)
}
