import Image from "next/image";

export default function Home() {
	return (
		<main className="flex items-center justify-center h-full">
			<div className="bg-white p-6 rounded-lg w-2/3">
				<div>
					<h3 className="mb-4 font-bold">住宿人數：3 人，3 位小孩 / 3 房</h3>
					<div className="bg-message-blue rounded-lg p-4 border border-gray-300">
						尚未分配人數：4 位大人，3 位小孩
					</div>
				</div>
				<div>
					<div className="my-4">
						<span>房間：</span>
						<span>1 人</span>
					</div>
					<div>
						<div className="flex justify-between items-start mb-4">
							<div className="flex-1">
								<div>大人</div>
								<div className="text-sm text-gray-500">年齡 20+</div>
							</div>
							<div className="flex items-center">
								<button className="bg-white border border-gray-300 text-gray-500 px-2 py-2 rounded w-12 h-12">
									-
								</button>
								<div className="mx-4 tracking-normal w-6 text-center">1</div>
								<button className="bg-white border border-gray-300 text-gray-500 px-2 py-2 rounded w-12 h-12">
									+
								</button>
							</div>
						</div>
						<div className="flex justify-between">
							<div className="mb-2">
								<div>小孩</div>
							</div>
							<div className="flex items-center">
								<button className="bg-white border border-message-blue text-gray-500 px-2 py-2 rounded w-12 h-12">
									-
								</button>
								<div className="mx-4 tracking-normal w-6 text-center">1</div>
								<button className="bg-white border border-message-blue text-gray-500 px-2 py-2 rounded w-12 h-12">
									+
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
