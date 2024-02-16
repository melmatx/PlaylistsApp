export const idlFactory = ({ IDL }) => {
  const Song = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'artist' : IDL.Text,
  });
  return IDL.Service({
    'addToPlaylist' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
    'getPlaylist' : IDL.Func([], [IDL.Vec(Song)], ['query']),
    'removeFromPlaylist' : IDL.Func([IDL.Text], [], []),
    'resetPlaylist' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
