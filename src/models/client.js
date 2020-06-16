// @flow

/**
 * Client model.
 */
export type Client = {|
    id: string,
    name: string,
    email: string,
    role: string
|};

/**
 * Clients database model.
 */
export type ClientSource = {|
    clients: Client[]
|};
