import * as Earthstar from 'https://deno.land/x/earthstar@8.2.4/mod.ts'
import { serve } from "https://deno.land/std@0.133.0/http/mod.ts"
import { micromark } from "https://esm.sh/micromark";
import { TransportWebsocketServer } from "https://deno.land/x/earthstar_streaming_rpc/mod.ts";

const MY_SHARE = '+nichothzone.123'

const driver = new Earthstar.ReplicaDriverSqlite({
    filename: 'share.db',
    mode: 'create-or-open',
    share: MY_SHARE
})

const replica = new Earthstar.Replica(
    MY_SHARE,
    Earthstar.FormatValidatorEs4,
    driver
)

const peer = new Earthstar.Peer()
peer.addReplica(replica)

// lets build a blog

// we need a syncer
const syncer = new Earthstar.Syncer(peer, (methods) => {
    return new TransportWebsocketServer()
})



async function handler (req: Request) {
    const url = new URL(req.url)
    const document = await replica.getLatestDocAtPath(url.pathname)

    if (!document) {
        return new Response("Not Found", { status: 400 })
    }

    return new Response(document?.content)
}