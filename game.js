//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

kaboom({
  global: true,
  width: 1920, // width of canvas
  height: 6215, // height of canvas
  // fullscreen: true,
  // scale: 1,
  debug: true,
  clearColor: [0, 0, 1, 1],
})

// Speeds
const MOVE_SPEED = 1200
const SLICER_SPEED = 100
const SKELETOR_SPEED = 60

// Game Logic
loadRoot('https://i.imgur.com/')
loadSprite('link-going-left', 'Q7lv1fk.png')
loadSprite('link-going-right', '65ms4cu.png')
loadSprite('link-going-down', 'OZMpz1v.png')
loadSprite('link-going-up', 'a6Li3A3.png')
loadSprite('left-wall', 'HBxw7Uw.png')
loadSprite('top-wall', 'xw8MjU0.png')
loadSprite('bottom-wall', 'GlFwnCQ.png')
loadSprite('right-wall', 'AwMtCdt.png')
loadSprite('bottom-left-wall', 'Or7Orfd.png')
loadSprite('bottom-right-wall', 'bOwTZIa.png')
loadSprite('top-left-wall', 'ACVEa5r.png')
loadSprite('top-right-wall', '3HcxM0U.jpg')
loadSprite('top-door', 'oAGk5w7.png')
loadSprite('fire-pot', 'HmH9JfK.png')
loadSprite('left-door', 'WkgOdeO.png')
loadSprite('lanterns', 'dxV3Qxo.png')
loadSprite('slicer', 'myr3VE3.png')
loadSprite('skeletor', 'LdHzUtC.png')
loadSprite('kaboom', 'BhA4Dof.png')
loadSprite('stairs', 'lrq7j3g.png')
loadSprite('bg', 'ovRrL4m.png')
loadSprite('bg-l-4', 'sLdr8sl.jpg')
loadSprite('dive-going-right', 'Oi4jmra.png') // [img]https://i.imgur.com/Oi4jmra.png[/img]
loadSprite('dive-going-left', '9ws0EQK.png') // [img]https://i.imgur.com/9ws0EQK.png[/img]
loadSprite('dive-going-down', 'XSGm2k0.png') // [img]https://i.imgur.com/XSGm2k0.png[/img]
loadSprite('dive-going-up', 'VZMfPn6.png') // [img]https://i.imgur.com/VZMfPn6.png[/img]
loadSprite('shark', 'A8YZA2r.png') // [img]https://i.imgur.com/A8YZA2r.png[/img]


scene('game', ({ level, score }) => {
  // layers(['bg', 'obj', 'ui'], 'obj')
  layers(['bg-l-4', 'obj', 'ui'], 'obj')

  // map original
  // const maps = [
  //   [
  //     'ycc)cccccw',
  //     'a        b',
  //     'a        b',
  //     'a        b',
  //     'a        b',
  //     'a        b',
  //     'a      * b',
  //     'a    (   b',
  //     '%        b',
  //     'a    (   b',
  //     'a   *    b',
  //     'a        b',
  //     'xdd)^d)ddz',
  //   ],
  //   [
  //     'yccc^ccccw',
  //     'a        b',
  //     ')        )',
  //     'a        b',
  //     'a        b',
  //     'a    $   b',
  //     ')   }    )',
  //     'a        b',
  //     'xddddddddz',
  //   ],
  // ]

  const maps = [
    [
      '                                     a     ',
      '                                           ',
      '                                           ',
      '                                           ',
      '                                           ',
      ' aaa                                       ',
      'a   aa                                      ',
      'a    aa                                     ',
      '                                           ',
      '                                           ',
      '                                           ',
      '                                           ',
      '                                           ',
      '                                           ',
      '                                           ',
      '                                           ',
      '                                           ',
      '                                           ',
      '                                           ',
      '                        #                  ',
      '                                           ',
      '                                           ',
      '                                           ',
      '                                           ',
      '                                           ',
      '                                           ',
      '                                           ',
      '      *                                    ',
      '    (                                      ',
      '%                                          ',
      '    (                                      ',
      '   *                                       ',
      '                                           ',
      'xdd)^d)ddz                            z    ',
    ],
    [
      'yccc^ccccw',
      'a        b',
      ')        )',
      'a        b',
      'a        b',
      'a    $   b',
      ')   }    )',
      'a        b',
      'xddddddddz',
    ],
  ]

  const levelCfg = {
    width: 48,
    height: 48,
    a: [sprite('left-wall'), solid(), 'wall'],
    b: [sprite('right-wall'), solid(), 'wall'],
    c: [sprite('top-wall'), solid(), 'wall'],
    d: [sprite('bottom-wall'), solid(), 'wall'],
    w: [sprite('top-right-wall'), solid(), 'wall'],
    x: [sprite('bottom-left-wall'), solid(), 'wall'],
    y: [sprite('top-left-wall'), solid(), 'wall'],
    z: [sprite('bottom-right-wall'), solid(), 'wall'],
    '%': [sprite('left-door'), solid(), 'door'],
    '^': [sprite('top-door'), 'next-level'],
    $: [sprite('stairs'), 'next-level'],
    '*': [sprite('slicer'), 'slicer', { dir: -1 }, 'dangerous'],
    '}': [sprite('skeletor'), 'dangerous', 'skeletor', { dir: -1, timer: 0 }],
    ')': [sprite('lanterns'), solid()],
    '(': [sprite('fire-pot'), solid()],
    '#': [sprite('shark'), 'dangerous', 'shark', { dir: -1, timer: 0 }],
  }
  addLevel(maps[level], levelCfg)

  // add([sprite('bg'), layer('bg')])
  add([sprite('bg-l-4'), layer('bg-l-4')])

  const scoreLabel = add([
    text('0'),
    pos(800, 450),
    layer('ui'),
    {
      value: score,
    },
    scale(2),
  ])

  add([text('level ' + parseInt(level + 1)), pos(800, 465), scale(2)])

  const player = add([
    sprite('dive-going-right'),
    pos(100, 300),
    {
      // right by default
      dir: vec2(1, 0),
    },
  ])

  player.action(() => {
    player.resolve()
  })

  player.overlaps('next-level', () => {
    go('game', {
      level: (level + 1) % maps.length,
      score: scoreLabel.value,
    })
  })

  keyDown('left', () => {
    player.changeSprite('dive-going-left')
    player.move(-MOVE_SPEED, 0)
    player.dir = vec2(-1, 0)
  })

  keyDown('right', () => {
    player.changeSprite('dive-going-right')
    player.move(MOVE_SPEED, 0)
    player.dir = vec2(1, 0)
  })

  keyDown('up', () => {
    player.changeSprite('dive-going-up')
    player.move(0, -MOVE_SPEED)
    player.dir = vec2(0, -1)
  })

  keyDown('down', () => {
    player.changeSprite('dive-going-down')
    player.move(0, MOVE_SPEED)
    player.dir = vec2(0, 1)
  })

  function spawnKaboom(p) {
    const obj = add([sprite('kaboom'), pos(p), 'kaboom'])
    wait(1, () => {
      destroy(obj)
    })
  }

  keyPress('space', () => {
    spawnKaboom(player.pos.add(player.dir.scale(48)))
  })

  player.collides('door', (d) => {
    destroy(d)
  })

  collides('kaboom', 'skeletor', (k,s) => {
    camShake(4)
    wait(1, () => {
      destroy(k)
    })
    destroy(s)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
  })

  action('slicer', (s) => {
    s.move(s.dir * SLICER_SPEED, 0)
  })

  collides('slicer', 'wall', (s) => {
    s.dir = -s.dir
  })

  action('shark', (s) => {
    s.move(0, s.dir * SKELETOR_SPEED)
    s.timer -= dt()
    if (s.timer <= 0) {
      s.dir = -s.dir
      s.timer = rand(5)
    }
  })

  action('skeletor', (s) => {
    s.move(0, s.dir * SKELETOR_SPEED)
    s.timer -= dt()
    if (s.timer <= 0) {
      s.dir = -s.dir
      s.timer = rand(5)
    }
  })

  collides('skeletor', 'wall', (s) => {
    s.dir = -s.dir
  })

  player.overlaps('dangerous', () => {
    go('lose', { score: scoreLabel.value })
  })
})

scene('lose', ({ score }) => {
  add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)])
})

start('game', { level: 0, score: 0 })