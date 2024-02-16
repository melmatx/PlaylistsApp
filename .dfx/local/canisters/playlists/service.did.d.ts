import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Song { 'id' : string, 'name' : string, 'artist' : string }
export interface _SERVICE {
  'addToPlaylist' : ActorMethod<[string, string, string], undefined>,
  'getPlaylist' : ActorMethod<[], Array<Song>>,
  'removeFromPlaylist' : ActorMethod<[string], undefined>,
  'resetPlaylist' : ActorMethod<[], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
