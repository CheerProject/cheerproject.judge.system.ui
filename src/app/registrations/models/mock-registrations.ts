import { RegistrationStatus } from '../enums/registration-status.enum';
import { Status } from './status';
import { Registration } from './registration';

export const REGISTRATIONS: Registration[] = [
  {
    id: 1,
    divisionGroup: {
      id: 1,
      group: {
        groupId: 1
      },
      gender: {
        id: 1,
        name: 'COED'
      },
      level: {
        id: 1,
        name: '4'
      },
      division: {
        id: 1,
        name: 'Open'
      },
      category: {
        id: 1,
        name: 'Equipo'
      }
    },
    team: {
      id: 1,
      name: 'Lions',
      coach: 'Javier Flores'
    },
    championship: {
      id: 1,
      name: 'Nacional',
      date: new Date('2018-07-11T06:22:42.940Z'),
      address: 'DIGEF'
    },
    status: {
      id: 1,
      name: RegistrationStatus.OnTime
    },
    points: 0
  },
  {
    id: 2,
    divisionGroup: {
      id: 2,
      group: {
        groupId: 1
      },
      gender: {
        id: 1,
        name: 'COED'
      },
      level: {
        id: 1,
        name: '4'
      },
      division: {
        id: 1,
        name: 'Open'
      },
      category: {
        id: 1,
        name: 'Equipo'
      }
    },
    team: {
      id: 2,
      name: 'Landivar',
      coach: 'Pablo Solís'
    },
    championship: {
      id: 1,
      name: 'Nacional',
      date: new Date('2018-07-11T06:22:42.940Z'),
      address: 'DIGEF'
    },
    status: {
      id: 1,
      name: RegistrationStatus.OnTime
    },
    points: 0
  },
  ,
  {
    id: 3,
    divisionGroup: {
      id: 3,
      group: {
        groupId: 1
      },
      gender: {
        id: 1,
        name: 'COED'
      },
      level: {
        id: 1,
        name: '4'
      },
      division: {
        id: 1,
        name: 'Open'
      },
      category: {
        id: 1,
        name: 'Equipo'
      }
    },
    team: {
      id: 3,
      name: 'Escuintla',
      coach: 'Entrenador'
    },
    championship: {
      id: 1,
      name: 'Nacional',
      date: new Date('2018-07-11T06:22:42.940Z'),
      address: 'DIGEF'
    },
    status: {
      id: 2,
      name: RegistrationStatus.Pending
    },
    points: 0
  },
  ,
  {
    id: 4,
    divisionGroup: {
      id: 4,
      group: {
        groupId: 1
      },
      gender: {
        id: 1,
        name: 'COED'
      },
      level: {
        id: 1,
        name: '4'
      },
      division: {
        id: 1,
        name: 'Open'
      },
      category: {
        id: 1,
        name: 'Equipo'
      }
    },
    team: {
      id: 4,
      name: 'Pegasos',
      coach: 'Gabriela Martines'
    },
    championship: {
      id: 1,
      name: 'Nacional',
      date: new Date('2018-07-11T06:22:42.940Z'),
      address: 'DIGEF'
    },
    status: {
      id: 3,
      name: RegistrationStatus.OnTime
    },
    points: 0
  }
];
