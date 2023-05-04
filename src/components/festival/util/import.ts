export const process = (importSchedule: ImportSchedule, importStages: ImportStages, importBands: ImportBands, bandImgs: Array<ImageMetadata>) => {
	function bandSchedule(bandKey: string): Schedule[] {
		if (!importSchedule) return [];
		return importSchedule.days.reduce((acc: Schedule[], day) => {
			const schedule: Schedule = [];
			Object.entries(day.schedule).forEach(([time, bandKeys]) => {
				bandKeys.forEach((key, idx) => {
					if (bandKey === key) {
						schedule.push({
							time,
							stageKey: day.stages[idx]
						});
					}
				});
			});
			acc.push(schedule)
			return acc;
		}, []);
	}

	return {
		pdays: (): Days => {
			if (!importSchedule?.days) return [];
			return importSchedule.days.map((day) => (
				{
					date: new Date(Date.parse(`${day.date}T00:00`)),
					location: day.location,
					mapUrl: day.mapUrl,
					stageKeys: day.stages,
					bandKeys:
						Object
							.values(day.schedule)
							.flat()
							.filter((key, idx, arr) => arr.indexOf(key) === idx)
				}
			));
		},
		pstages: (): Stages => {
			if (!importStages || !importSchedule) return {};
			const stages = Object.entries(importStages).reduce(
				(acc: Stages, [key, stage]) => {
					acc[key] = {
						key,
						name: stage.name,
						mapUrl: stage.mapUrl,
						x: stage.x,
						y: stage.y,
						schedule: [],
					};
					return acc;
				},
				{}
			);

			importSchedule.days.forEach(day => {
				day.stages.forEach((stageKey, idx) => {
					stages[stageKey].schedule =
						Object.entries(day.schedule).map(([time, bandKeys]) => {
							const bandKey = bandKeys[idx];
							return { time, bandKey };
						});
				});
			});

			return stages;
		},
		pbands: (): Bands => {
			if (!importBands) return {};
			const blankImg = bandImgs.find((img) => img.src.indexOf('_blank') > -1)
			return Object.entries(importBands).reduce((acc: Bands, [key, band]) => {
				const image = bandImgs.find((img) => img.src.indexOf(key) > -1) || blankImg;
				acc[key] = { ...band, key, image, scheduleByDay: bandSchedule(key) };
				return acc;
			}, {})
		},
	}
};