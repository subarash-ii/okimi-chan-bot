import createToken from "./createToken.ts";
import config from "../../config";
import { Client } from "osu-web.js";
import type { UserExtended } from "osu-web.js";
import { OsuJSUnexpectedResponseError } from "osu-web.js";
import log from "../logs/logger.ts";

let token: string | null = null;

export default async function getUser(username: string): Promise<UserExtended | null | undefined> {
  try {
    if (!config.OSU_CLIENT_ID || !config.OSU_CLIENT_SECRET) {
      log("ERROR", "osu! token not received yet");
      throw new Error("osu! token not received yet");
    }

    const freshToken = await createToken(config.OSU_CLIENT_ID, config.OSU_CLIENT_SECRET);

    if (String(token) !== freshToken) {
      token = freshToken;
    }

    if (typeof token === "string") {
      const client = new Client(token);

      return await client.users.getUser(username, {
        urlParams: { mode: "osu" }
      });
    }
  } catch (e) {

    if (!(e instanceof OsuJSUnexpectedResponseError)) {
      return null;
    }

    const htmlError = e.response().status;

    if (htmlError === 404) {
      return null;
    } else {
      log("WARN", `HTTP ${ htmlError } error in osu! API request`);
      return undefined;
    }
  }
}