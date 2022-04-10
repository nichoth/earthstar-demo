import * as Earthstar from 'https://deno.land/x/earthstar@8.2.4/mod.ts'
import join from 'https://deno.land/std@0.133.0'

import keypair from './identity.json' assert { type: "json" }

const MY_SHARE = 'nichoth.bla'

const driver = new Earthstar.ReplicaDriverMemory(MY_SHARE);

const replica = new Earthstar.Replica(
    MY_SHARE,
    Earthstar.FormatValidatorEs4,
    driver
)

// writing blog posts into the replicas


const POSTS_PATH = './posts'

for await (const entry of Deno.readDir(POSTS_PATH)) {
    const filePath = join(POSTS_PATH, entry.name)
    const fileContents = await Deno.readTextFile(filePath)

    await replica.set(keypair, {
        path: `/posts/${entry.name}`,
        content: fileContents,
        format: ''
    })
}

// lets sync
const peer = new Earthstar.Peer()
peer.addReplica(replica)
peer.sync('ws://localhost:8080/eathstar')