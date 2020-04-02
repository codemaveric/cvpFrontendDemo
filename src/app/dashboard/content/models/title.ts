export interface Episode {
    showThumbnail: string;
    title: string;
    titleSlug: string;
    titleId: number;
    season: string;
    seasonSlug: string;
    seasonId: number;
    name: string;
    seasonNumber: number;
    episodeNumber: number;
    language: string;
    version: string;
    purchase: string;
    episodeSlug: string;
    platform: string;
    episodeId: string;
    createdOn: Date;
    startDate: Date;
    verifiedOn: Date;
    nextVerification: Date;
    failedVerificationCount: number;
    isExpired: boolean;
    isAvailable: boolean;
    isPlaying: boolean;
    isVerified: boolean;
    checked: boolean; // Used for client checkbox

}


export class Season {
    public id: number;
    public name: string;
    public titleId: number;
    public seasonNumber: number;
    public totalEpisodes: number;
    public totalVerified: number;
    public totalAvailable: number;
    public totalPlaying: number;
    public checked: boolean; // Used for client checkbox
    public episodes: Episode[];

    constructor(episode: Episode) {
        this.id = episode.seasonId;
        this.titleId = episode.titleId;
        this.name = episode.season;
        this.seasonNumber = episode.seasonNumber;
        this.totalEpisodes = 1;
        this.totalVerified = episode.isVerified ? 1 : 0;
        this.totalAvailable = episode.isAvailable ? 1 : 0;
        this.totalPlaying = episode.isPlaying ? 1 : 0;
        this.episodes = [episode];
    }

}

export class Title {
    public id: number;
    public titleName: string;
    public titleSlug: string;
    public showThumbnail: string;
    public totalEpisodes: number;
    public totalVerified: number;
    public totalAvailable: number;
    public totalPlaying: number;
    public seasons: Season[];

    constructor(public season: Season) {
        const firstEpisode = season.episodes[0];
        this.id = firstEpisode.titleId;
        this.titleName = firstEpisode.title;
        this.titleSlug = firstEpisode.titleSlug;
        this.showThumbnail = firstEpisode.showThumbnail;
        this.totalPlaying = season.totalPlaying;
        this.totalAvailable = season.totalAvailable;
        this.totalVerified = season.totalVerified;
        this.totalEpisodes = season.totalEpisodes;
        this.seasons = [season];
    }


    public static processFromRawEpisodes(episodes: Episode[]): Title[] {
        const titleMap = new Map<number, Title>();
        const seasonsMap = new Map<number, Season>();

        for (const episode of episodes) {
            const season = seasonsMap.get(episode.seasonId);
            episode.checked = false; // set the default value of checked to false
            if (season) {
                season.totalEpisodes += 1;
                season.totalVerified += episode.isVerified ? 1 : 0;
                season.totalAvailable += episode.isAvailable ? 1 : 0;
                season.totalPlaying += episode.isPlaying ? 1 : 0;
                season.episodes.push(episode);
                season.episodes.sort((c1, c2) => c1.episodeNumber - c2.episodeNumber);
            } else {
                seasonsMap.set(episode.seasonId, new Season(episode));
            }
        }

        for (const season of seasonsMap.values()) {
            const title = titleMap.get(season.titleId);
            if (title) {
                title.totalEpisodes += season.totalEpisodes;
                title.totalVerified += season.totalVerified;
                title.totalAvailable += season.totalAvailable;
                title.totalPlaying += season.totalPlaying;
                title.seasons.push(season);
                title.seasons.sort((c1, c2) => c1.seasonNumber - c2.seasonNumber);
            } else {
                titleMap.set(season.titleId, new Title(season));
            }
        }

        return Array.from(titleMap.values());
    }

}
