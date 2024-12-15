interface CoordsProps {
  x: number // 원의 중심의 x 좌표
  y: number // 원의 중심의 y 좌표
  radius: number // 원의 반지름
  degree: number // 원점에서 부터 호를 그릴 각도
}

interface ArcProps extends CoordsProps {
  prevDegree: number
}

const getCoordsOnCircle = ({ x, y, radius, degree }: CoordsProps) => {
  //원점, 회전각 => 끝 좌표 구하기
  const radian = (degree / 180) * Math.PI
  return { x: x + radius * Math.cos(radian), y: y + radius * Math.sin(radian) }
}

const getArc = ({ x, y, radius, prevDegree, degree }: ArcProps) => {
  // 원점, 회전각 받음 => 끝 좌표 구해서 => 호 그리기
  const startCoord = getCoordsOnCircle({ x, y, radius, degree: prevDegree - QUARTER_CIRCLE_DEGREES })
  const endCoord = getCoordsOnCircle({ x, y, radius, degree: degree - QUARTER_CIRCLE_DEGREES })
  const isLargeArc = degree > 180 ? 0 : 1
  // A rx ry x축-회전각 큰-호-플래그 쓸기-방향-플래그 dx dy
  const d = `
    M ${startCoord.x} ${startCoord.y} 
    A ${radius} ${radius}, 0, ${isLargeArc}, 1, ${endCoord.x} ${endCoord.y}
  `
  return d
}

const CENTER_X = 50
const CENTER_Y = 50
const RADIUS = 15
const FULL_CIRCLE_DEGREES = 360
const QUARTER_CIRCLE_DEGREES = 90

export const DonutChart = ({ data }) => {
  const total = data.reduce((result, value) => result + value.amount, 0)
  const accumulatedAngles = data.reduce(
    (result, value, index) => {
      const angle = (value.amount / total) * FULL_CIRCLE_DEGREES
      const newAngle = result[index] + angle
      return [...result, newAngle]
    },
    [0]
  )
  return (
    <svg width="500" height="500" viewBox="0 0 100 100">
      {data.map((item, index, array) => {
        console.log(accumulatedAngles)
        return (
          <path
            key={index}
            d={getArc({
              x: CENTER_X,
              y: CENTER_Y,
              radius: RADIUS,
              prevDegree: accumulatedAngles[index],
              degree: accumulatedAngles[index + 1],
            })}
            stroke={`var(--accent-${11 - index})`}
            strokeWidth={15}
            fill="transparent"
          />
        )
      })}
    </svg>
  )
}
