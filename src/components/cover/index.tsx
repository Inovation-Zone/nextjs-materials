import { Typography } from "antd";


const Cover = () => {
  return (
    <div className='mt-24'>
      <img
        src="https://s3-materials-storage.s3.ap-southeast-1.amazonaws.com/others/1680079661140_bwfl4e6xlw5.png"
        alt=""
        className='w-full h-[500px]' />
      <div className='pr-24 pl-24 mt-12'>
        <Typography.Title level={2}>Panel Plus: The Leading Manufacturer of Wood Substitute products</Typography.Title>
        <Typography.Text>Panel Plus Group formerly named MP Particle Board was founded in 1990 under the managerial direction of Mitr Phol Group. It operates as the leading manufacturer of Particle board, Medium density fibreboard, Melamine faced panels and Synchronous panel, the substitute wood products that are the results of the company’s incorporation of high quality manufacturing technology and excellent management.</Typography.Text>
      </div>
    </div>
  )
}

export default Cover;
