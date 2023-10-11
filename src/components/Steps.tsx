export function Steps() {
	return (
		<div class="max-w-xl mx-auto my-4 border-b-2 pb-4">
			<div class="flex pb-3">
				<div class="flex-1"></div>

				<div class="flex-1">
					<div class="w-10 h-10 bg-green mx-auto rounded-full text-lg text-white flex items-center">
						<span class="text-white text-center w-full">
							<i class="fa fa-check w-full fill-current white"></i>
						</span>
					</div>
				</div>

				<div class="w-1/6 align-center items-center align-middle content-center flex">
					<div class="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
						<div
							class="bg-green-light text-xs leading-none py-1 text-center text-grey-darkest rounded "
							style="width: 100%"
						></div>
					</div>
				</div>

				<div class="flex-1">
					<div class="w-10 h-10 bg-green mx-auto rounded-full text-lg text-white flex items-center">
						<span class="text-white text-center w-full">
							<i class="fa fa-check w-full fill-current white"></i>
						</span>
					</div>
				</div>

				<div class="w-1/6 align-center items-center align-middle content-center flex">
					<div class="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
						<div
							class="bg-green-light text-xs leading-none py-1 text-center text-grey-darkest rounded "
							style="width: 20%"
						></div>
					</div>
				</div>

				<div class="flex-1">
					<div class="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-white flex items-center">
						<span class="text-grey-darker text-center w-full">3</span>
					</div>
				</div>

				<div class="w-1/6 align-center items-center align-middle content-center flex">
					<div class="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
						<div
							class="bg-green-light text-xs leading-none py-1 text-center text-grey-darkest rounded "
							style="width: 0%"
						></div>
					</div>
				</div>

				<div class="flex-1">
					<div class="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-white flex items-center">
						<span class="text-grey-darker text-center w-full">4</span>
					</div>
				</div>

				<div class="flex-1"></div>
			</div>

			<div class="flex text-xs content-center text-center">
				<div class="w-1/4">Invitation received</div>

				<div class="w-1/4">Personal details</div>

				<div class="w-1/4">Application details</div>

				<div class="w-1/4">Confirmation</div>
			</div>
		</div>
	);
}

export default Steps;
