export default interface IUseCase<TInput, TOutput> {
    Execute(inArgs: TInput) : Promise<TOutput>
}
