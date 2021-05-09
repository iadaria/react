// Init Effects

import { forward, guard, sample } from 'effector';
import { $tableUsers } from '../users';
import {
  $currentConnectID,
  $stage,
  $tableCapacity,
  $tableIDs,
  updateCurrentIDandStage,
  updateStage,
} from '.';

// Как только находим пустой стол возвращаем его ID
sample({
  source: {
    tableIDs: $tableIDs,
    stage: $stage,
  },
  clock: $tableUsers,
  fn: ({ tableIDs, stage }, tableUsers) => {
    for (let i = 0; i < tableIDs.length; i++) {
      const currentId = tableIDs[i];
      const tableWithNoUsers = tableUsers[currentId] === undefined;

      if (tableWithNoUsers || tableUsers[currentId].length < stage) {
        return { ID: currentId, stage };
      }
    } //end for
    return { ID: tableIDs[0], stage: stage + 1 };
  },
  target: updateCurrentIDandStage,
});

forward({
  // Здесь передается два значение но мы берем только одно ID
  from: updateCurrentIDandStage.map(({ ID }) => ID),
  to: $currentConnectID,
});

guard({
  source: updateStage,
  filter: sample({
    source: $tableCapacity,
    clock: updateStage,
    fn: (capacity, stage) => stage <= capacity,
  }),
  target: $stage,
});
